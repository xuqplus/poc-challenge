package com.example.jigsawapi.service;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.dto.SolutionDto;
import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.dto.SolveStatistics;
import com.example.jigsawapi.jigsaw.JigsawPlacementCatalog;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

/**
 * Alternative solver: MRV (minimum remaining values) variable ordering + forward checking + bitmask DFS. Does not
 * replace the legacy nested-loop exhaustive implementation in {@link CalendarJigsawService}; produces the same solution
 * set for a given board (enumeration order may differ).
 */
@Service
public class CalendarJigsawMrvService {

    private static boolean pastDeadline(Long deadlineNanos) {
        return deadlineNanos != null && System.nanoTime() >= deadlineNanos;
    }

    /**
     * Same contract as {@link CalendarJigsawService#resolve(String, Integer, Integer, Integer, Integer, Long)} — this
     * implementation is never cached.
     */
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

        List<SolutionDto> solutions = new ArrayList<>();
        Set<String> dedupe = new LinkedHashSet<>();
        MutableSolverStats stats = new MutableSolverStats();
        boolean[] timedOut = {false};

        LinkedHashMap<String, Long> assignment = new LinkedHashMap<>();
        LinkedHashSet<String> remaining =
                new LinkedHashSet<>(Arrays.asList(JigsawPlacementCatalog.PIECE_IDS));

        dfs(
                target,
                placementMap,
                0L,
                assignment,
                remaining,
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

    private void dfs(
            int[][] target,
            Map<String, Set<Long>> placementMap,
            long occupied,
            LinkedHashMap<String, Long> assignment,
            LinkedHashSet<String> remaining,
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
        if (assignment.size() == 10) {
            recordSolution(target, assignment, dedupe, stats, solutions);
            return;
        }

        String next = selectMrvPiece(occupied, remaining, placementMap, stats);
        if (next == null) {
            return;
        }

        for (Long mask : placementMap.get(next)) {
            if (pastDeadline(deadlineNanos)) {
                timedOut[0] = true;
                return;
            }
            if ((mask & occupied) != 0) {
                stats.overlapRejects++;
                continue;
            }
            assignment.put(next, mask);
            remaining.remove(next);
            dfs(
                    target,
                    placementMap,
                    occupied | mask,
                    assignment,
                    remaining,
                    solutions,
                    dedupe,
                    stats,
                    timedOut,
                    deadlineNanos,
                    maxSolutions);
            remaining.add(next);
            assignment.remove(next);
            if (solutions.size() >= maxSolutions || timedOut[0]) {
                return;
            }
        }
    }

    /**
     * Pick remaining piece with smallest number of placements compatible with {@code occupied}. Tie-break: canonical
     * {@link JigsawPlacementCatalog#PIECE_IDS} order. Returns {@code null} if some remaining piece has zero feasible
     * placements (forward-check prune).
     */
    private String selectMrvPiece(
            long occupied,
            LinkedHashSet<String> remaining,
            Map<String, Set<Long>> placementMap,
            MutableSolverStats stats) {
        String best = null;
        int bestFeasible = Integer.MAX_VALUE;
        for (String id : JigsawPlacementCatalog.PIECE_IDS) {
            if (!remaining.contains(id)) {
                continue;
            }
            int feasible = 0;
            for (Long pl : placementMap.get(id)) {
                if ((pl & occupied) != 0) {
                    stats.overlapRejects++;
                } else {
                    feasible++;
                }
            }
            if (feasible == 0) {
                return null;
            }
            if (feasible < bestFeasible) {
                bestFeasible = feasible;
                best = id;
            }
        }
        return best;
    }

    private void recordSolution(
            int[][] target,
            LinkedHashMap<String, Long> assignment,
            Set<String> dedupe,
            MutableSolverStats stats,
            List<SolutionDto> solutions) {
        long[] sorted =
                new long[] {
                    assignment.get("AA"),
                    assignment.get("BB"),
                    assignment.get("CC"),
                    assignment.get("DD"),
                    assignment.get("EE"),
                    assignment.get("FF"),
                    assignment.get("GG"),
                    assignment.get("HH"),
                    assignment.get("II"),
                    assignment.get("JJ"),
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
                        assignment.get("AA"),
                        assignment.get("BB"),
                        assignment.get("CC"),
                        assignment.get("DD"),
                        assignment.get("EE"),
                        assignment.get("FF"),
                        assignment.get("GG"),
                        assignment.get("HH"),
                        assignment.get("II"),
                        assignment.get("JJ")));
        stats.solutionsEmitted++;
    }

    private static final class MutableSolverStats {
        long overlapRejects;
        long dedupeRejects;
        long leafCandidates;
        long solutionsEmitted;
    }
}
