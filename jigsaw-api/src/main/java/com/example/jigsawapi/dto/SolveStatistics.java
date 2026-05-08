package com.example.jigsawapi.dto;

/**
 * Counters collected during exhaustive search; useful for baseline vs optimized solver comparison.
 */
public record SolveStatistics(
        long overlapRejects,
        long dedupeRejects,
        long leafCandidates,
        long solutionsEmitted) {}
