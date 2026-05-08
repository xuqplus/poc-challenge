package com.example.jigsawapi.service;

import java.time.LocalDate;

/** Builds {@link SolverInputs} from HTTP/query parameters — shared by solver services. */
public final class SolverInputsParser {

    private static final int DEFAULT_MAX = 50;
    private static final int HARD_CAP = 500;

    private SolverInputsParser() {}

    public static SolverInputs parse(String date, Integer month, Integer day, Integer week, Integer count) {
        int max = count == null || count <= 0 ? DEFAULT_MAX : Math.min(count, HARD_CAP);
        if (date != null && !date.isBlank()) {
            LocalDate ld = CalendarJigsawService.parseDate(date.trim());
            int m = ld.getMonthValue() - 1;
            int d = ld.getDayOfMonth() - 1;
            int w = CalendarJigsawService.weekSun0(ld);
            String key = "d:" + ld + "|c:" + max;
            return new SolverInputs(m, d, w, max, key);
        }
        if (month == null || day == null || week == null) {
            throw new IllegalArgumentException(
                    "Provide either `date` or all of `month`, `day`, `week` (see README).");
        }
        if (month < 0 || month > 11) {
            throw new IllegalArgumentException("month must be 0–11");
        }
        if (day < 0 || day > 30) {
            throw new IllegalArgumentException("day must be 0–30 (0 = 1st)");
        }
        if (week < 0 || week > 6) {
            throw new IllegalArgumentException("week must be 0–6 (0 = Sunday)");
        }
        String key = "t:" + month + ":" + day + ":" + week + "|c:" + max;
        return new SolverInputs(month, day, week, max, key);
    }
}
