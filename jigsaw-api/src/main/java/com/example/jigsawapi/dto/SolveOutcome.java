package com.example.jigsawapi.dto;

/** Result of an uncached solve, including observability counters for benchmarks. */
public record SolveOutcome(ResolveResponse response, SolveStatistics statistics) {}
