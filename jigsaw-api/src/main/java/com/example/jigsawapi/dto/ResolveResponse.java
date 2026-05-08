package com.example.jigsawapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Collections;
import java.util.List;

/**
 * GET /resolve payload — combines README fields with Play14 expectations ({@code data} is a list of
 * solutions, each with {@code matrix}).
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ResolveResponse(
        int code,
        String message,
        Integer month,
        Integer day,
        Integer week,
        /** Number of solutions returned in {@link #data()}. */
        int count,
        List<SolutionDto> data,
        /** Requested {@code count} cap (null for legacy error payloads). */
        Integer requestedCount,
        /** True if search stopped early due to deadline with fewer solutions than requested. */
        Boolean timedOut) {

    public static ResolveResponse error(int code, String message) {
        return new ResolveResponse(code, message, null, null, null, 0, Collections.emptyList(), null, null);
    }
}
