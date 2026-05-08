package com.example.jigsawapi.benchmark;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.example.jigsawapi.dto.SolveOutcome;
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
 * Baseline benchmark for exhaustive solver — writes CSV under {@code target/benchmark-results/}.
 *
 * <p>Not run by default (slow). Enable with:
 *
 * <pre>{@code mvn test -Djigsaw.benchmark=true -Dtest=SolverBaselineBenchmarkIT}</pre>
 *
 * <p>For exhaustive vs MRV on identical dates, prefer {@link SolverComparisonBenchmarkIT}.
 */
@SpringBootTest
@EnabledIfSystemProperty(named = "jigsaw.benchmark", matches = "true")
class SolverBaselineBenchmarkIT {

    private static final String SOLVER_LABEL = "exhaustive";

    @Autowired
    private CalendarJigsawService calendarJigsawService;

    @Test
    void runBaselineAndWriteCsv() throws IOException {
        String runId = UUID.randomUUID().toString();
        long seed = BenchmarkScenarioPlanner.DEFAULT_SEED;
        List<BenchmarkSample> samples = BenchmarkScenarioPlanner.plan(seed);

        Path dir = Path.of("target", "benchmark-results");
        Files.createDirectories(dir);
        Path csv = dir.resolve("solver-baseline-" + System.currentTimeMillis() + ".csv");

        try (BufferedWriter w = Files.newBufferedWriter(csv, UTF_8)) {
            BenchmarkCsvSupport.writeHeader(w);
            for (BenchmarkSample s : samples) {
                long t0 = System.nanoTime();
                SolveOutcome outcome =
                        calendarJigsawService.resolveForBenchmark(
                                BenchmarkScenarioPlanner.formatDate(s),
                                null,
                                null,
                                null,
                                s.requestedCount(),
                                BenchmarkScenarioPlanner.TIMEOUT_MS_PER_SOLUTION);
                long wallNs = System.nanoTime() - t0;
                BenchmarkCsvSupport.writeRow(
                        w, runId, seed, SOLVER_LABEL, s, outcome, wallNs);
            }
        }
    }
}
