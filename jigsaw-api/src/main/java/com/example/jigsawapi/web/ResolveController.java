package com.example.jigsawapi.web;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.service.CalendarJigsawService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResolveController {

    private final CalendarJigsawService calendarJigsawService;

    public ResolveController(CalendarJigsawService calendarJigsawService) {
        this.calendarJigsawService = calendarJigsawService;
    }

    /**
     * Compatible with raas-jigsaw-web README and Play14:
     *
     * <ul>
     *   <li>{@code ?date=MM/DD/YYYY} or ISO {@code yyyy-MM-dd} (Play14 uses {@code date} + {@code count})
     *   <li>{@code ?month=&day=&week=&count=} per README (0-based month/day, Sun=0 week)
     * </ul>
     */
    @GetMapping("/resolve")
    public ResponseEntity<ResolveResponse> resolve(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day,
            @RequestParam(required = false) Integer week,
            @RequestParam(required = false) Integer count) {
        try {
            return ResponseEntity.ok(calendarJigsawService.resolve(date, month, day, week, count));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ResolveResponse.error(1, ex.getMessage()));
        }
    }
}
