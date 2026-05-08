package com.example.jigsawapi.service;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.dto.SolutionDto;
import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.dto.SolveStatistics;
import com.example.jigsawapi.jigsaw.JigsawPlacementCatalog;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 * Alternative solver: MRV + incremental feasible counts + bitmask DFS. Value ordering: least-constraining value
 * (LCV) — try placements that remove the fewest options from other remaining pieces first; tie-break lower popcount,
 * then candidate index.
 */
@Service
public class CalendarJigsawMrvService {

    private static final long UNASSIGNED = -1L;

    /** Bitmask over piece indices 0..9: all pieces still unassigned. */
    private static final int ALL_PIECES_MASK = (1 << JigsawPlacementCatalog.PIECE_IDS.length) - 1;

    private static boolean pastDeadline(Long deadlineNanos) {
        return deadlineNanos != null && System.nanoTime() >= deadlineNanos;
    }

    public ResolveResponse resolve(
            String date, Integer month, Integer day, Integer week, Integer count, Long timeoutMsPerSolution) {
        SolverInputs in = SolverInputsParser.parse(date, month, day, week, count);
        if (timeoutMsPerSolution != null && timeoutMsPerSolution > 0) {
            long budgetMs = timeoutMsPerSolution * (long) in.maxSolutions();
            long deadlineNanos = System.nanoTime() + budgetMs * 1_000_000L;
            return computeMrv(in, deadlineNanos).response();
        }
        return computeMrv(in, null).response();
    }

    public ResolveResponse resolve(String date, Integer month, Integer day, Integer week, Integer count) {
        return resolve(date, month, day, week, count, null);
    }

    /** Uncached benchmark entry — mirrors {@link CalendarJigsawService#resolveForBenchmark}. */
    public SolveOutcome resolveForBenchmark(
            String date, Integer month, Integer day, Integer week, Integer count, Long timeoutMsPerSolution) {
        SolverInputs in = SolverInputsParser.parse(date, month, day, week, count);
        Long deadlineNanos = null;
        if (timeoutMsPerSolution != null && timeoutMsPerSolution > 0) {
            long budgetMs = timeoutMsPerSolution * (long) in.maxSolutions();
            deadlineNanos = System.nanoTime() + budgetMs * 1_000_000L;
        }
        return computeMrv(in, deadlineNanos);
    }

    private SolveOutcome computeMrv(SolverInputs in, Long deadlineNanos) {
        int m = in.month0();
        int d = in.day0();
        int w = in.weekSun0();
        int max = in.maxSolutions();

        int[][] target = CalendarJigsawService.buildTargetMatrix(m, d, w);
        Map<String, Set<Long>> placementMap = JigsawPlacementCatalog.buildPlacementMap(target);

        long[][] placementsByIndex = new long[JigsawPlacementCatalog.PIECE_IDS.length][];
        int[] placementLen = new int[JigsawPlacementCatalog.PIECE_IDS.length];
        int[] feasibleCount = new int[JigsawPlacementCatalog.PIECE_IDS.length];
        int maxPlacementRow = 0;
        for (int i = 0; i < JigsawPlacementCatalog.PIECE_IDS.length; i++) {
            Set<Long> set = placementMap.get(JigsawPlacementCatalog.PIECE_IDS[i]);
            long[] arr = set.stream().mapToLong(Long::longValue).toArray();
            placementsByIndex[i] = arr;
            placementLen[i] = arr.length;
            feasibleCount[i] = arr.length;
            maxPlacementRow = Math.max(maxPlacementRow, arr.length);
        }

        int[] candidateKsScratch = new int[maxPlacementRow];
        long[] lcvScoreScratch = new long[maxPlacementRow];

        List<SolutionDto> solutions = new ArrayList<>();
        Set<String> dedupe = new LinkedHashSet<>();
        MutableSolverStats stats = new MutableSolverStats();
        boolean[] timedOut = {false};
        long[] assignedMask = new long[JigsawPlacementCatalog.PIECE_IDS.length];
        Arrays.fill(assignedMask, UNASSIGNED);

        dfs(
                target,
                placementsByIndex,
                placementLen,
                feasibleCount,
                candidateKsScratch,
                lcvScoreScratch,
                0L,
                ALL_PIECES_MASK,
                assignedMask,
                solutions,
                dedupe,
                stats,
                timedOut,
                deadlineNanos,
                max);

        boolean tOut = timedOut[0] && solutions.size() < max;
        String msg = tOut ? "partial_timeout" : "ok";
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
                        tOut ? Boolean.TRUE : Boolean.FALSE);
        SolveStatistics st =
                new SolveStatistics(
                        stats.overlapRejects,
                        stats.dedupeRejects,
                        stats.leafCandidates,
                        stats.solutionsEmitted);
        return new SolveOutcome(response, st);
    }

    /**
     * Count placements for {@code pieceIdx} that are compatible with {@code occ} but clash with {@code addMask}
     * (incremental domain shrink when {@code occ} becomes {@code occ | addMask}).
     */
    private static int countDrop(long[] pls, int len, long occ, long addMask) {
        int d = 0;
        for (int i = 0; i < len; i++) {
            long pl = pls[i];
            if ((pl & occ) == 0 && (pl & addMask) != 0) {
                d++;
            }
        }
        return d;
    }

    /** Sum of {@link #countDrop} over other remaining pieces — lower means less constraining (LCV). */
    private static long sumDropsForRemaining(
            long[][] placementsByIndex,
            int[] placementLen,
            int pieceP,
            long occupied,
            long mask,
            int childRemaining) {
        long sum = 0;
        for (int q = 0; q < JigsawPlacementCatalog.PIECE_IDS.length; q++) {
            if (q == pieceP) {
                continue;
            }
            if (((childRemaining >> q) & 1) == 0) {
                continue;
            }
            sum += countDrop(placementsByIndex[q], placementLen[q], occupied, mask);
        }
        return sum;
    }

    /** Insertion sort by (lcvSum asc, bitCount(mask) asc, candidate index k asc). */
    private static void sortCandidatesByLcv(int[] ks, long[] lcvScores, long[] placementsForP, int nv) {
        for (int i = 1; i < nv; i++) {
            int kKey = ks[i];
            long scoreKey = lcvScores[i];
            long maskKey = placementsForP[kKey];
            int bcKey = Long.bitCount(maskKey);

            int j = i - 1;
            while (j >= 0) {
                int kj = ks[j];
                long sj = lcvScores[j];
                long mj = placementsForP[kj];
                int bj = Long.bitCount(mj);

                boolean moveRight = false;
                if (sj > scoreKey) {
                    moveRight = true;
                } else if (sj == scoreKey) {
                    if (bj > bcKey) {
                        moveRight = true;
                    } else if (bj == bcKey && kj > kKey) {
                        moveRight = true;
                    }
                }

                if (!moveRight) {
                    break;
                }
                ks[j + 1] = ks[j];
                lcvScores[j + 1] = lcvScores[j];
                j--;
            }
            ks[j + 1] = kKey;
            lcvScores[j + 1] = scoreKey;
        }
    }

    /**
     * Pick remaining piece with smallest feasible domain; tie-break lower piece index. Returns {@code null} if any
     * remaining piece has zero feasible placements.
     */
    private static Integer selectMrvPiece(int remainingMask, int[] feasibleCount) {
        int best = -1;
        int bestFc = Integer.MAX_VALUE;
        for (int i = 0; i < feasibleCount.length; i++) {
            if (((remainingMask >> i) & 1) == 0) {
                continue;
            }
            int fc = feasibleCount[i];
            if (fc == 0) {
                return null;
            }
            if (best < 0 || fc < bestFc || (fc == bestFc && i < best)) {
                bestFc = fc;
                best = i;
            }
        }
        return best >= 0 ? best : null;
    }

    private void dfs(
            int[][] target,
            long[][] placementsByIndex,
            int[] placementLen,
            int[] feasibleCount,
            int[] candidateKsScratch,
            long[] lcvScoreScratch,
            long occupied,
            int remainingMask,
            long[] assignedMask,
            List<SolutionDto> solutions,
            Set<String> dedupe,
            MutableSolverStats stats,
            boolean[] timedOut,
            Long deadlineNanos,
            int maxSolutions) {

        if (pastDeadline(deadlineNanos)) {
            timedOut[0] = true;
            return;
        }
        if (solutions.size() >= maxSolutions) {
            return;
        }
        if (remainingMask == 0) {
            recordSolution(target, assignedMask, dedupe, stats, solutions);
            return;
        }

        Integer pObj = selectMrvPiece(remainingMask, feasibleCount);
        if (pObj == null) {
            return;
        }
        int p = pObj;
        int childRemaining = remainingMask & ~(1 << p);
        long[] placementsP = placementsByIndex[p];

        int nv = 0;
        for (int k = 0; k < placementLen[p]; k++) {
            long mask = placementsP[k];
            if ((mask & occupied) != 0) {
                stats.overlapRejects++;
                continue;
            }
            candidateKsScratch[nv] = k;
            lcvScoreScratch[nv] =
                    sumDropsForRemaining(placementsByIndex, placementLen, p, occupied, mask, childRemaining);
            nv++;
        }

        sortCandidatesByLcv(candidateKsScratch, lcvScoreScratch, placementsP, nv);
        int[] trialOrder = Arrays.copyOfRange(candidateKsScratch, 0, nv);

        for (int i = 0; i < nv; i++) {
            if (pastDeadline(deadlineNanos)) {
                timedOut[0] = true;
                return;
            }
            int k = trialOrder[i];
            long mask = placementsP[k];

            for (int q = 0; q < feasibleCount.length; q++) {
                if (((childRemaining >> q) & 1) == 0) {
                    continue;
                }
                feasibleCount[q] -=
                        countDrop(placementsByIndex[q], placementLen[q], occupied, mask);
            }

            boolean zeroDomain = false;
            for (int q = 0; q < feasibleCount.length; q++) {
                if (((childRemaining >> q) & 1) == 0) {
                    continue;
                }
                if (feasibleCount[q] == 0) {
                    zeroDomain = true;
                    break;
                }
            }

            if (!zeroDomain) {
                assignedMask[p] = mask;
                dfs(
                        target,
                        placementsByIndex,
                        placementLen,
                        feasibleCount,
                        candidateKsScratch,
                        lcvScoreScratch,
                        occupied | mask,
                        childRemaining,
                        assignedMask,
                        solutions,
                        dedupe,
                        stats,
                        timedOut,
                        deadlineNanos,
                        maxSolutions);
                assignedMask[p] = UNASSIGNED;
            }

            for (int q = 0; q < feasibleCount.length; q++) {
                if (((childRemaining >> q) & 1) == 0) {
                    continue;
                }
                feasibleCount[q] +=
                        countDrop(placementsByIndex[q], placementLen[q], occupied, mask);
            }

            if (solutions.size() >= maxSolutions || timedOut[0]) {
                return;
            }
        }
    }

    private void recordSolution(
            int[][] target,
            long[] masksByIndex,
            Set<String> dedupe,
            MutableSolverStats stats,
            List<SolutionDto> solutions) {
        long[] sorted =
                new long[] {
                    masksByIndex[0],
                    masksByIndex[1],
                    masksByIndex[2],
                    masksByIndex[3],
                    masksByIndex[4],
                    masksByIndex[5],
                    masksByIndex[6],
                    masksByIndex[7],
                    masksByIndex[8],
                    masksByIndex[9],
                };
        Arrays.sort(sorted);
        String key = Arrays.toString(sorted);
        if (!dedupe.add(key)) {
            stats.dedupeRejects++;
            return;
        }
        stats.leafCandidates++;
        solutions.add(
                CalendarJigsawService.overlaySolution(
                        target,
                        masksByIndex[0],
                        masksByIndex[1],
                        masksByIndex[2],
                        masksByIndex[3],
                        masksByIndex[4],
                        masksByIndex[5],
                        masksByIndex[6],
                        masksByIndex[7],
                        masksByIndex[8],
                        masksByIndex[9]));
        stats.solutionsEmitted++;
    }

    private static final class MutableSolverStats {
        long overlapRejects;
        long dedupeRejects;
        long leafCandidates;
        long solutionsEmitted;
    }
}
