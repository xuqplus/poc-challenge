package com.example.jigsawapi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.jigsawapi.dto.ResolveResponse;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;

class CalendarJigsawServiceTest {

    private static CalendarJigsawService newService() {
        return new CalendarJigsawService(Caffeine.newBuilder().recordStats().build());
    }

    @Test
    void weekSun0_matchesJsDateGetDay() {
        LocalDate fri = LocalDate.of(2022, 11, 11);
        assertEquals(5, CalendarJigsawService.weekSun0(fri));
        LocalDate sun = LocalDate.of(2022, 11, 13);
        assertEquals(0, CalendarJigsawService.weekSun0(sun));
    }

    @Test
    void buildTargetMatrix_hasEightBySevenGrid() {
        int[][] t = CalendarJigsawService.buildTargetMatrix(0, 0, 0);
        assertEquals(8, t.length);
        assertEquals(7, t[0].length);
    }

    @Test
    void resolve_byDate_returnsSolutions() {
        CalendarJigsawService svc = newService();
        ResolveResponse r = svc.resolve("11/11/2022", null, null, null, 4);
        assertEquals(0, r.code());
        assertEquals(10, r.month());
        assertEquals(10, r.day());
        assertEquals(5, r.week());
        assertEquals(4, r.count());
        assertEquals(4, r.requestedCount().intValue());
        assertEquals(4, r.data().size());
        assertFalse(r.data().isEmpty());
        var m = r.data().get(0).matrix();
        assertEquals(8, m.length);
        assertEquals(7, m[0].length);
    }

    @Test
    void resolve_byReadmeParams_equivalentToDate() {
        CalendarJigsawService svc = newService();
        ResolveResponse a = svc.resolve(null, 10, 10, 5, 2);
        ResolveResponse b = svc.resolve("11/11/2022", null, null, null, 2);
        assertEquals(a.month(), b.month());
        assertEquals(a.day(), b.day());
        assertEquals(a.week(), b.week());
        assertEquals(a.data().size(), b.data().size());
    }

    @Test
    void resolve_requiresParamsOrDate() {
        CalendarJigsawService svc = newService();
        assertThrows(IllegalArgumentException.class, () -> svc.resolve(null, null, null, null, 1));
        assertThrows(IllegalArgumentException.class, () -> svc.resolve(null, 0, null, 0, 1));
    }

    @Test
    void resolve_withTimeout_hasRequestedCount_andBoundedPartial() {
        CalendarJigsawService svc = newService();
        ResolveResponse r = svc.resolve("11/11/2022", null, null, null, 100, 1L);
        assertEquals(100, r.requestedCount().intValue());
        assertTrue(r.count() <= 100);
        assertNotNull(r.timedOut());
        if (Boolean.TRUE.equals(r.timedOut())) {
            assertEquals("partial_timeout", r.message());
        }
    }
}
