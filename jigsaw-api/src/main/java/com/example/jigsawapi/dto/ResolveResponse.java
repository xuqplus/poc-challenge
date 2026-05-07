package com.example.jigsawapi.dto;

import java.util.Collections;
import java.util.List;

/**
 * GET /resolve payload — combines README fields with Play14 expectations ({@code data} is a list of
 * solutions, each with {@code matrix}).
 */
public record ResolveResponse(
        int code,
        String message,
        Integer month,
        Integer day,
        Integer week,
        /** Number of solutions returned in {@link #data()} (<= requested {@code count}). */
        int count,
        List<SolutionDto> data) {

    public static ResolveResponse error(int code, String message) {
        return new ResolveResponse(code, message, null, null, null, 0, Collections.emptyList());
    }
}
