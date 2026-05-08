package com.example.jigsawapi.benchmark;

import java.time.LocalDate;

/** One benchmark invocation: scenario id, row index, calendar date, requested solution count. */
public record BenchmarkSample(String scenarioId, int sampleIndex, LocalDate date, int requestedCount) {}
