package com.example.jigsawapi.benchmark;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.example.jigsawapi.dto.SolveOutcome;
import com.example.jigsawapi.service.CalendarJigsawMrvService;
import com.example.jigsawapi.service.CalendarJigsawService;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfSystemProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Writes paired CSVs for exhaustive vs MRV solvers using identical scenario rows (same seed, same dates).
 *
 * <pre>{@code mvn test -Djigsaw.benchmark.compare=true -Dtest=SolverComparisonBenchmarkIT}</pre>
 */
@SpringBootTest
@EnabledIfSystemProperty(named = "jigsaw.benchmark.compare", matches = "true")
class SolverComparisonBenchmarkIT {

    private static final String EXHAUSTIVE = "exhaustive";
    private static final String MRV = "mrv";

    @Autowired
    private CalendarJigsawService exhaustiveService;

    @Autowired
    private CalendarJigsawMrvService mrvService;

    @Test
    void runPairedBenchmarksAndWriteCsv() throws IOException {
        long seed = BenchmarkScenarioPlanner.DEFAULT_SEED;
        List<BenchmarkSample> samples = BenchmarkScenarioPlanner.plan(seed);
        String runId = UUID.randomUUID().toString();

        Path dir = Path.of("target", "benchmark-results");
        Files.createDirectories(dir);
        long ts = System.currentTimeMillis();
        Path csvExhaustive = dir.resolve("solver-exhaustive-" + ts + ".csv");
        Path csvMrv = dir.resolve("solver-mrv-" + ts + ".csv");

        try (BufferedWriter w = Files.newBufferedWriter(csvExhaustive, UTF_8)) {
            BenchmarkCsvSupport.writeHeader(w);
            for (BenchmarkSample s : samples) {
                long t0 = System.nanoTime();
                SolveOutcome outcome =
                        exhaustiveService.resolveForBenchmark(
                                BenchmarkScenarioPlanner.formatDate(s),
                                null,
                                null,
                                null,
                                s.requestedCount(),
                                BenchmarkScenarioPlanner.TIMEOUT_MS_PER_SOLUTION);
                long wallNs = System.nanoTime() - t0;
                BenchmarkCsvSupport.writeRow(w, runId, seed, EXHAUSTIVE, s, outcome, wallNs);
            }
        }

        try (BufferedWriter w = Files.newBufferedWriter(csvMrv, UTF_8)) {
            BenchmarkCsvSupport.writeHeader(w);
            for (BenchmarkSample s : samples) {
                long t0 = System.nanoTime();
                SolveOutcome outcome =
                        mrvService.resolveForBenchmark(
                                BenchmarkScenarioPlanner.formatDate(s),
                                null,
                                null,
                                null,
                                s.requestedCount(),
                                BenchmarkScenarioPlanner.TIMEOUT_MS_PER_SOLUTION);
                long wallNs = System.nanoTime() - t0;
                BenchmarkCsvSupport.writeRow(w, runId, seed, MRV, s, outcome, wallNs);
            }
        }
    }
}
