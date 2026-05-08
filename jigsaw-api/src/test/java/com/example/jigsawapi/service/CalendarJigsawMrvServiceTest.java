package com.example.jigsawapi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.example.jigsawapi.dto.ResolveResponse;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.junit.jupiter.api.Test;

/** Ensures MRV solver agrees with legacy exhaustive counts for the same date + cap (same solution set). */
class CalendarJigsawMrvServiceTest {

    @Test
    void mrv_matchesExhaustive_solutionCount() {
        CalendarJigsawService exhaustive = new CalendarJigsawService(Caffeine.newBuilder().build());
        CalendarJigsawMrvService mrv = new CalendarJigsawMrvService();
        int cap = 24;
        ResolveResponse a = exhaustive.resolve("11/11/2022", null, null, null, cap);
        ResolveResponse b = mrv.resolve("11/11/2022", null, null, null, cap);
        assertEquals(a.count(), b.count());
        assertEquals(a.requestedCount(), b.requestedCount());
    }
}
