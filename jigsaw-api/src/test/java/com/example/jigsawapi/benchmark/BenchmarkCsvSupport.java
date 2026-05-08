package com.example.jigsawapi.benchmark;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.dto.SolveStatistics;
import java.io.BufferedWriter;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

/** Shared CSV header and row format for solver benchmarks (includes {@code solver} column). */
public final class BenchmarkCsvSupport {

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE;

    private BenchmarkCsvSupport() {}

    public static void writeHeader(BufferedWriter w) throws IOException {
        w.write(
                String.join(
                        ",",
                        "run_id",
                        "random_seed",
                        "solver",
                        "scenario_id",
                        "sample_index",
                        "date_iso",
                        "requested_count",
                        "returned_count",
                        "success_samples",
                        "failure_samples",
                        "timed_out",
                        "wall_time_ns",
                        "overlap_rejects",
                        "dedupe_rejects",
                        "leaf_candidates",
                        "solutions_emitted",
                        "message"));
        w.newLine();
    }

    public static void writeRow(
            BufferedWriter w,
            String runId,
            long seed,
            String solver,
            BenchmarkSample sample,
            SolveOutcome outcome,
            long wallNs)
            throws IOException {
        String dateStr = ISO.format(sample.date());
        ResolveResponse resp = outcome.response();
        SolveStatistics st = outcome.statistics();
        int requestedCount = sample.requestedCount();
        int returned = resp.count();
        int success = returned;
        int failure = Math.max(0, requestedCount - returned);
        boolean timedOut = Boolean.TRUE.equals(resp.timedOut());

        w.write(csvEscape(runId));
        w.write(',');
        w.write(Long.toString(seed));
        w.write(',');
        w.write(csvEscape(solver));
        w.write(',');
        w.write(csvEscape(sample.scenarioId()));
        w.write(',');
        w.write(Integer.toString(sample.sampleIndex()));
        w.write(',');
        w.write(csvEscape(dateStr));
        w.write(',');
        w.write(Integer.toString(requestedCount));
        w.write(',');
        w.write(Integer.toString(returned));
        w.write(',');
        w.write(Integer.toString(success));
        w.write(',');
        w.write(Integer.toString(failure));
        w.write(',');
        w.write(Boolean.toString(timedOut));
        w.write(',');
        w.write(Long.toString(wallNs));
        w.write(',');
        w.write(Long.toString(st.overlapRejects()));
        w.write(',');
        w.write(Long.toString(st.dedupeRejects()));
        w.write(',');
        w.write(Long.toString(st.leafCandidates()));
        w.write(',');
        w.write(Long.toString(st.solutionsEmitted()));
        w.write(',');
        w.write(csvEscape(resp.message()));
        w.newLine();
    }

    public static String csvEscape(String s) {
        if (s == null) {
            return "";
        }
        if (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0) {
            return "\"" + s.replace("\"", "\"\"") + "\"";
        }
        return s;
    }
}
