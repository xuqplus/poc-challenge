package com.example.jigsawapi.service;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.dto.SolutionDto;
import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.dto.SolveStatistics;
import com.example.jigsawapi.jigsaw.MatrixUtil;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.stats.CacheStats;
import org.springframework.stereotype.Service;

/**
 * Exhaustive calendar jigsaw solver ported from calendar-jigsaw {@code Main} /
 * {@link MatrixUtil}. Matches board geometry used by raas-jigsaw-web {@code Play14}.
 */
@Service
public class CalendarJigsawService {

    private static final int DEFAULT_MAX = 50;
    private static final int HARD_CAP = 500;

    private final Cache<String, ResolveResponse> resolveResponseCache;

    public CalendarJigsawService(Cache<String, ResolveResponse> resolveResponseCache) {
        this.resolveResponseCache = resolveResponseCache;
    }

    /** Parsed query + normalized cache key ({@code d:yyyy-MM-dd|c:n} or {@code t:m:d:w|c:n}). */
    private record SolverInputs(int month0, int day0, int weekSun0, int maxSolutions, String cacheKey) {}

    /** Month cells on board (0–11). Same layout as calendar-jigsaw Main. */
    private static final int[][] M = {
        {0, 0}, {0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5},
        {1, 0}, {1, 1}, {1, 2}, {1, 3}, {1, 4}, {1, 5},
    };

    /** Day-of-month cells (0–30). */
    private static final int[][] D = {
        {2, 0}, {2, 1}, {2, 2}, {2, 3}, {2, 4}, {2, 5}, {2, 6},
        {3, 0}, {3, 1}, {3, 2}, {3, 3}, {3, 4}, {3, 5}, {3, 6},
        {4, 0}, {4, 1}, {4, 2}, {4, 3}, {4, 4}, {4, 5}, {4, 6},
        {5, 0}, {5, 1}, {5, 2}, {5, 3}, {5, 4}, {5, 5}, {5, 6},
        {6, 0}, {6, 1}, {6, 2},
    };

    /** Weekday cells; Sunday = 0 … Saturday = 6 (matches JS {@code Date#getDay()}). */
    private static final int[][] W = {
        {6, 3}, {6, 4}, {6, 5}, {6, 6}, {7, 4}, {7, 5}, {7, 6},
    };

    private static final int[][] AA = {
        {1, 1, 0, 0,},
        {0, 1, 0, 0,},
        {0, 1, 0, 0,},
        {0, 1, 0, 0,},
    };

    private static final int[][] BB = {
        {1, 0, 0,},
        {1, 1, 0,},
        {1, 1, 0,},
    };

    private static final int[][] CC = {
        {1, 1, 1,},
        {1, 0, 1,},
        {0, 0, 0,},
    };

    private static final int[][] DD = {
        {1, 1, 1,},
        {1, 0, 0,},
        {1, 0, 0,},
    };

    private static final int[][] EE = {
        {1, 1, 0,},
        {0, 1, 0,},
        {0, 1, 1,},
    };

    private static final int[][] FF = {
        {1, 1, 1,},
        {0, 1, 0,},
        {0, 1, 0,},
    };

    private static final int[][] GG = {
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
    };

    private static final int[][] HH = {
        {1, 1, 0,},
        {0, 1, 0,},
        {0, 1, 0,},
    };

    private static final int[][] II = {
        {1, 1, 0, 0,},
        {0, 1, 1, 1,},
        {0, 0, 0, 0,},
        {0, 0, 0, 0,},
    };

    private static final int[][] JJ = {
        {1, 1, 0,},
        {0, 1, 1,},
        {0, 0, 0,},
    };

    private static final Map<String, int[][]> ELEMENTS = new LinkedHashMap<>();

    static {
        ELEMENTS.put("AA", AA);
        ELEMENTS.put("BB", BB);
        ELEMENTS.put("CC", CC);
        ELEMENTS.put("DD", DD);
        ELEMENTS.put("EE", EE);
        ELEMENTS.put("FF", FF);
        ELEMENTS.put("GG", GG);
        ELEMENTS.put("HH", HH);
        ELEMENTS.put("II", II);
        ELEMENTS.put("JJ", JJ);
    }

    /**
     * Resolve query aligned with raas-jigsaw-web README + Play14:
     *
     * <ul>
     *   <li>{@code date}: preferred by Play14 ({@code MM/DD/YYYY} or {@code ISO yyyy-MM-dd})
     *   <li>else {@code month} (0–11), {@code day} (0–30), {@code week} (0–6, Sun=0)
     * </ul>
     */
    /**
     * Cached resolve (no deadline). Use {@link #resolve(String, Integer, Integer, Integer, Integer, Long)} with a
     * per-solution budget to cap wall time and allow partial results.
     */
    public ResolveResponse resolve(String date, Integer month, Integer day, Integer week, Integer count) {
        return resolve(date, month, day, week, count, null);
    }

    /**
     * @param timeoutMsPerSolution if not null and positive, total wall-time budget is {@code timeoutMsPerSolution *
     *     requestedCount} ms; result is not cached. Returns partial solutions if the deadline is hit.
     */
    public ResolveResponse resolve(
            String date, Integer month, Integer day, Integer week, Integer count, Long timeoutMsPerSolution) {
        SolverInputs in = buildSolverInputs(date, month, day, week, count);
        if (timeoutMsPerSolution != null && timeoutMsPerSolution > 0) {
            long budgetMs = timeoutMsPerSolution * (long) in.maxSolutions();
            long deadlineNanos = System.nanoTime() + budgetMs * 1_000_000L;
            return computeResolve(in, deadlineNanos).response();
        }
        return resolveResponseCache.get(in.cacheKey(), k -> computeResolve(in, null).response());
    }

    /**
     * Uncached solve with optional deadline budget (for benchmarks). When {@code timeoutMsPerSolution} is null,
     * runs until exhaustive finish (no timeout).
     */
    public SolveOutcome resolveForBenchmark(
            String date, Integer month, Integer day, Integer week, Integer count, Long timeoutMsPerSolution) {
        SolverInputs in = buildSolverInputs(date, month, day, week, count);
        Long deadlineNanos = null;
        if (timeoutMsPerSolution != null && timeoutMsPerSolution > 0) {
            long budgetMs = timeoutMsPerSolution * (long) in.maxSolutions();
            deadlineNanos = System.nanoTime() + budgetMs * 1_000_000L;
        }
        return computeResolve(in, deadlineNanos);
    }

    private SolverInputs buildSolverInputs(
            String date, Integer month, Integer day, Integer week, Integer count) {
        int max = count == null || count <= 0 ? DEFAULT_MAX : Math.min(count, HARD_CAP);
        if (date != null && !date.isBlank()) {
            LocalDate ld = parseDate(date.trim());
            int m = ld.getMonthValue() - 1;
            int d = ld.getDayOfMonth() - 1;
            int w = weekSun0(ld);
            String key = "d:" + ld + "|c:" + max;
            return new SolverInputs(m, d, w, max, key);
        }
        if (month == null || day == null || week == null) {
            throw new IllegalArgumentException(
                    "Provide either `date` or all of `month`, `day`, `week` (see README).");
        }
        if (month < 0 || month > 11) {
            throw new IllegalArgumentException("month must be 0–11");
        }
        if (day < 0 || day > 30) {
            throw new IllegalArgumentException("day must be 0–30 (0 = 1st)");
        }
        if (week < 0 || week > 6) {
            throw new IllegalArgumentException("week must be 0–6 (0 = Sunday)");
        }
        String key = "t:" + month + ":" + day + ":" + week + "|c:" + max;
        return new SolverInputs(month, day, week, max, key);
    }

    private static boolean pastDeadline(Long deadlineNanos) {
        return deadlineNanos != null && System.nanoTime() >= deadlineNanos;
    }

    private SolveOutcome computeResolve(SolverInputs in, Long deadlineNanos) {
        int m = in.month0();
        int d = in.day0();
        int w = in.weekSun0();
        int max = in.maxSolutions();

        int[][] target = buildTargetMatrix(m, d, w);
        Map<String, Set<Long>> placementMap = buildPlacementMap(target);

        Set<Long> aa = placementMap.getOrDefault("AA", Set.of());
        Set<Long> bb = placementMap.getOrDefault("BB", Set.of());
        Set<Long> cc = placementMap.getOrDefault("CC", Set.of());
        Set<Long> dd = placementMap.getOrDefault("DD", Set.of());
        Set<Long> ee = placementMap.getOrDefault("EE", Set.of());
        Set<Long> ff = placementMap.getOrDefault("FF", Set.of());
        Set<Long> gg = placementMap.getOrDefault("GG", Set.of());
        Set<Long> hh = placementMap.getOrDefault("HH", Set.of());
        Set<Long> ii = placementMap.getOrDefault("II", Set.of());
        Set<Long> jj = placementMap.getOrDefault("JJ", Set.of());

        List<SolutionDto> solutions = new ArrayList<>();
        Set<String> dedupe = new LinkedHashSet<>();
        MutableSolverStats stats = new MutableSolverStats();
        boolean timedOut = false;

        search:
        for (Long a : aa) {
            if (pastDeadline(deadlineNanos)) {
                timedOut = true;
                break search;
            }
            for (Long b : bb) {
                if ((a & b) != 0) {
                    stats.overlapRejects++;
                    continue;
                }
                long b0 = a | b;
                for (Long c : cc) {
                    if ((b0 & c) != 0) {
                        stats.overlapRejects++;
                        continue;
                    }
                    long c0 = b0 | c;
                    for (Long dL : dd) {
                        if ((c0 & dL) != 0) {
                            stats.overlapRejects++;
                            continue;
                        }
                        long d0 = c0 | dL;
                        for (Long e : ee) {
                            if ((d0 & e) != 0) {
                                stats.overlapRejects++;
                                continue;
                            }
                            long e0 = d0 | e;
                            for (Long f : ff) {
                                if ((e0 & f) != 0) {
                                    stats.overlapRejects++;
                                    continue;
                                }
                                long f0 = e0 | f;
                                for (Long g : gg) {
                                    if ((f0 & g) != 0) {
                                        stats.overlapRejects++;
                                        continue;
                                    }
                                    long g0 = f0 | g;
                                    for (Long h : hh) {
                                        if ((g0 & h) != 0) {
                                            stats.overlapRejects++;
                                            continue;
                                        }
                                        long h0 = g0 | h;
                                        for (Long i : ii) {
                                            if ((h0 & i) != 0) {
                                                stats.overlapRejects++;
                                                continue;
                                            }
                                            long i0 = h0 | i;
                                            for (Long j : jj) {
                                                if (pastDeadline(deadlineNanos)) {
                                                    timedOut = true;
                                                    break search;
                                                }
                                                if ((i0 & j) == 0) {
                                                    stats.leafCandidates++;
                                                    long[] sorted = new long[] {a, b, c, dL, e, f, g, h, i, j};
                                                    Arrays.sort(sorted);
                                                    String dedupeKey = Arrays.toString(sorted);
                                                    if (!dedupe.add(dedupeKey)) {
                                                        stats.dedupeRejects++;
                                                        continue;
                                                    }
                                                    solutions.add(
                                                            overlaySolution(target, a, b, c, dL, e, f, g, h, i, j));
                                                    stats.solutionsEmitted++;
                                                    if (solutions.size() >= max) {
                                                        break search;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        String msg =
                timedOut && solutions.size() < max ? "partial_timeout" : "ok";
        ResolveResponse response =
                new ResolveResponse(
                        0,
                        msg,
                        m,
                        d,
                        w,
                        solutions.size(),
                        solutions,
                        max,
                        timedOut && solutions.size() < max ? Boolean.TRUE : Boolean.FALSE);
        SolveStatistics st =
                new SolveStatistics(
                        stats.overlapRejects,
                        stats.dedupeRejects,
                        stats.leafCandidates,
                        stats.solutionsEmitted);
        return new SolveOutcome(response, st);
    }

    private static final class MutableSolverStats {
        long overlapRejects;
        long dedupeRejects;
        long leafCandidates;
        long solutionsEmitted;
    }

    /** For tests / observability (Caffeine {@code recordStats()}). */
    public CacheStats resolveCacheStats() {
        return resolveResponseCache.stats();
    }

    static int[][] buildTargetMatrix(int monthIndex, int dayIndex, int weekSun0) {
        int[][] board = initialReservedCells();
        board[M[monthIndex][0]][M[monthIndex][1]] = 1;
        board[D[dayIndex][0]][D[dayIndex][1]] = 1;
        board[W[weekSun0][0]][W[weekSun0][1]] = 1;
        return board;
    }

    private static int[][] initialReservedCells() {
        int[][] a = new int[8][7];
        a[0][6] = 1;
        a[1][6] = 1;
        a[7][0] = 1;
        a[7][1] = 1;
        a[7][2] = 1;
        a[7][3] = 1;
        return a;
    }

    private Map<String, Set<Long>> buildPlacementMap(int[][] target) {
        Map<String, Set<Long>> placementMap = new LinkedHashMap<>();
        for (Map.Entry<String, int[][]> entry : ELEMENTS.entrySet()) {
            String key = entry.getKey();
            int[][] element = entry.getValue();
            Set<Long> set = new HashSet<>();
            for (int[][] direction : MatrixUtil.getPossibleDirections(element)) {
                int[][] expanded = MatrixUtil.expand(direction, target.length, target[0].length);
                set.addAll(MatrixUtil.getPossiblePlacements(expanded, target));
            }
            placementMap.put(key, set);
        }
        return placementMap;
    }

    /** Sunday = 0 … Saturday = 6, aligned with {@code Date#getDay()} / Play14 {@code e.$W}. */
    static int weekSun0(LocalDate ld) {
        int iso = ld.getDayOfWeek().getValue();
        return iso % 7;
    }

    static LocalDate parseDate(String date) {
        List<DateTimeFormatter> formatters = new ArrayList<>();
        formatters.add(DateTimeFormatter.ISO_LOCAL_DATE);
        formatters.add(DateTimeFormatter.ofPattern("M/d/uuuu", Locale.US));
        formatters.add(DateTimeFormatter.ofPattern("MM/dd/uuuu", Locale.US));
        formatters.add(DateTimeFormatter.ofPattern("d/M/uuuu", Locale.US));

        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(date, formatter);
            } catch (DateTimeException ignored) {
                // try next
            }
        }
        throw new IllegalArgumentException("Unrecognized date format: " + date);
    }

    /**
     * Overlay target (`) then pieces A–J in AA…JJ order (matches Play14 piece colours).
     */
    static SolutionDto overlaySolution(
            int[][] target,
            long pa,
            long pb,
            long pc,
            long pd,
            long pe,
            long pf,
            long pg,
            long ph,
            long pi,
            long pj) {
        String[][] grid = new String[8][7];
        for (int r = 0; r < 8; r++) {
            Arrays.fill(grid[r], " ");
        }
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 7; c++) {
                if (target[r][c] != 0) {
                    grid[r][c] = "`";
                }
            }
        }
        applyPiece(grid, pa, 'A');
        applyPiece(grid, pb, 'B');
        applyPiece(grid, pc, 'C');
        applyPiece(grid, pd, 'D');
        applyPiece(grid, pe, 'E');
        applyPiece(grid, pf, 'F');
        applyPiece(grid, pg, 'G');
        applyPiece(grid, ph, 'H');
        applyPiece(grid, pi, 'I');
        applyPiece(grid, pj, 'J');
        return new SolutionDto(grid);
    }

    private static void applyPiece(String[][] grid, long mask, char name) {
        int[][] m = MatrixUtil.longToArray(mask);
        String ch = String.valueOf(name);
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 7; j++) {
                if (m[i][j] != 0) {
                    grid[i][j] = ch;
                }
            }
        }
    }
}
