package com.example.jigsawapi.service;

/** Parsed calendar query + normalized cache key ({@code d:yyyy-MM-dd|c:n} or {@code t:m:d:w|c:n}). */
public record SolverInputs(int month0, int day0, int weekSun0, int maxSolutions, String cacheKey) {}
