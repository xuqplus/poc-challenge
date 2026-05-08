package com.example.jigsawapi.benchmark;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/** Builds the same fixed-shape scenarios as {@link SolverBaselineBenchmarkIT} for a given RNG seed. */
public final class BenchmarkScenarioPlanner {

    /** Matches historical Day-2 baseline docs (paired exhaustive vs MRV runs). */
    public static final long DEFAULT_SEED = 42L;

    /** Per-solution budget for timed benchmarks (total budget = this × requestedCount). */
    public static final long TIMEOUT_MS_PER_SOLUTION = 2000L;

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE;

    private BenchmarkScenarioPlanner() {}

    public static String formatDate(BenchmarkSample sample) {
        return ISO.format(sample.date());
    }

    /**
     * Scenario 1: 100 random dates × 1 solution; S2: 10 dates × up to 10 solutions; S3: 1 date × up to 100
     * solutions — 111 rows total.
     */
    public static List<BenchmarkSample> plan(long seed) {
        Random rnd = new Random(seed);
        List<BenchmarkSample> out = new ArrayList<>(111);
        for (int i = 0; i < 100; i++) {
            out.add(new BenchmarkSample("S1", i, randomDate(rnd), 1));
        }
        for (int i = 0; i < 10; i++) {
            out.add(new BenchmarkSample("S2", i, randomDate(rnd), 10));
        }
        out.add(new BenchmarkSample("S3", 0, randomDate(rnd), 100));
        return List.copyOf(out);
    }

    private static LocalDate randomDate(Random r) {
        long min = LocalDate.of(2000, 1, 1).toEpochDay();
        long max = LocalDate.of(2035, 12, 31).toEpochDay();
        long day = min + (long) (r.nextDouble() * (max - min + 1));
        return LocalDate.ofEpochDay(day);
    }
}
