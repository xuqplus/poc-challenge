package com.example.jigsawapi.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ResolveResponseCacheTest {

    @Autowired
    private CalendarJigsawService calendarJigsawService;

    @Test
    void repeatedResolve_sameParams_incrementsHitCount() {
        String date = "03/15/2020";
        calendarJigsawService.resolve(date, null, null, null, 2);
        long hitsAfterFirst = calendarJigsawService.resolveCacheStats().hitCount();
        calendarJigsawService.resolve(date, null, null, null, 2);
        assertEquals(hitsAfterFirst + 1, calendarJigsawService.resolveCacheStats().hitCount());
    }

    @Test
    void differentCount_isSeparateCacheEntry() {
        String date = "04/20/2019";
        calendarJigsawService.resolve(date, null, null, null, 2);
        long missesAfterFirst = calendarJigsawService.resolveCacheStats().missCount();
        calendarJigsawService.resolve(date, null, null, null, 3);
        assertEquals(missesAfterFirst + 1, calendarJigsawService.resolveCacheStats().missCount());
    }
}
