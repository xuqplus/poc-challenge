package com.example.jigsawapi.benchmark;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.dto.SolveStatistics;
import com.example.jigsawapi.service.CalendarJigsawService;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfSystemProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Baseline benchmark for exhaustive solver — writes CSV under {@code target/benchmark-results/}.
 *
 * <p>Not run by default (slow). Enable with:
 *
 * <pre>{@code mvn test -Djigsaw.benchmark=true -Dtest=SolverBaselineBenchmarkIT}</pre>
 */
@SpringBootTest
@EnabledIfSystemProperty(named = "jigsaw.benchmark", matches = "true")
class SolverBaselineBenchmarkIT {

    private static final long TIMEOUT_MS_PER_SOLUTION = 2000L;
    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE;

    @Autowired
    private CalendarJigsawService calendarJigsawService;

    @Test
    void runBaselineAndWriteCsv() throws IOException {
        String runId = UUID.randomUUID().toString();
        long seed = 42L;
        Random rnd = new Random(seed);

        Path dir = Path.of("target", "benchmark-results");
        Files.createDirectories(dir);
        Path csv = dir.resolve("solver-baseline-" + System.currentTimeMillis() + ".csv");

        try (BufferedWriter w = Files.newBufferedWriter(csv, UTF_8)) {
            writeHeader(w);
            // Scenario 1: 100 random dates × 1 solution each → 100 success samples target
            for (int i = 0; i < 100; i++) {
                LocalDate d = randomDate(rnd);
                writeRow(
                        w,
                        runId,
                        seed,
                        "S1",
                        i,
                        d,
                        1,
                        TIMEOUT_MS_PER_SOLUTION);
            }
            // Scenario 2: 10 dates × up to 10 solutions each
            for (int i = 0; i < 10; i++) {
                LocalDate d = randomDate(rnd);
                writeRow(
                        w,
                        runId,
                        seed,
                        "S2",
                        i,
                        d,
                        10,
                        TIMEOUT_MS_PER_SOLUTION);
            }
            // Scenario 3: 1 date × up to 100 solutions
            LocalDate d3 = randomDate(rnd);
            writeRow(w, runId, seed, "S3", 0, d3, 100, TIMEOUT_MS_PER_SOLUTION);
        }
    }

    private static LocalDate randomDate(Random r) {
        long min = LocalDate.of(2000, 1, 1).toEpochDay();
        long max = LocalDate.of(2035, 12, 31).toEpochDay();
        long day = min + (long) (r.nextDouble() * (max - min + 1));
        return LocalDate.ofEpochDay(day);
    }

    private void writeHeader(BufferedWriter w) throws IOException {
        w.write(
                String.join(
                        ",",
                        "run_id",
                        "random_seed",
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

    private void writeRow(
            BufferedWriter w,
            String runId,
            long seed,
            String scenarioId,
            int sampleIndex,
            LocalDate date,
            int requestedCount,
            long timeoutMsPerSolution)
            throws IOException {
        String dateStr = ISO.format(date);
        long t0 = System.nanoTime();
        SolveOutcome outcome =
                calendarJigsawService.resolveForBenchmark(
                        dateStr, null, null, null, requestedCount, timeoutMsPerSolution);
        long wallNs = System.nanoTime() - t0;

        ResolveResponse resp = outcome.response();
        SolveStatistics st = outcome.statistics();
        int returned = resp.count();
        int success = returned;
        int failure = Math.max(0, requestedCount - returned);
        boolean timedOut = Boolean.TRUE.equals(resp.timedOut());

        w.write(csvEscape(runId));
        w.write(',');
        w.write(Long.toString(seed));
        w.write(',');
        w.write(csvEscape(scenarioId));
        w.write(',');
        w.write(Integer.toString(sampleIndex));
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

    private static String csvEscape(String s) {
        if (s == null) {
            return "";
        }
        if (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0) {
            return "\"" + s.replace("\"", "\"\"") + "\"";
        }
        return s;
    }
}
