package com.example.jigsawapi.web;

import com.example.jigsawapi.dto.ResolveResponse;
import com.example.jigsawapi.service.CalendarJigsawMrvService;
import com.example.jigsawapi.service.CalendarJigsawService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResolveController {

    private final CalendarJigsawService calendarJigsawService;
    private final CalendarJigsawMrvService calendarJigsawMrvService;

    public ResolveController(
            CalendarJigsawService calendarJigsawService, CalendarJigsawMrvService calendarJigsawMrvService) {
        this.calendarJigsawService = calendarJigsawService;
        this.calendarJigsawMrvService = calendarJigsawMrvService;
    }

    /**
     * Compatible with raas-jigsaw-web README and Play14:
     *
     * <ul>
     *   <li>{@code ?date=MM/DD/YYYY} or ISO {@code yyyy-MM-dd} (Play14 uses {@code date} + {@code count})
     *   <li>{@code ?month=&day=&week=&count=} per README (0-based month/day, Sun=0 week)
     * </ul>
     *
     * @param timeoutMsPerSolution optional wall-clock budget per requested solution; total budget is {@code
     *     timeoutMsPerSolution * count} ms. When set, legacy solver response is not cached and may return fewer
     *     solutions if time expires ({@code timedOut=true}, {@code message=partial_timeout}).
     * @param solver optional {@code mrv} for MRV + forward-checking DFS; default is legacy nested-loop exhaustive.
     */
    @GetMapping("/resolve")
    public ResponseEntity<ResolveResponse> resolve(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day,
            @RequestParam(required = false) Integer week,
            @RequestParam(required = false) Integer count,
            @RequestParam(required = false) Long timeoutMsPerSolution,
            @RequestParam(required = false) String solver) {
        try {
            if ("mrv".equalsIgnoreCase(solver)) {
                return ResponseEntity.ok(
                        calendarJigsawMrvService.resolve(date, month, day, week, count, timeoutMsPerSolution));
            }
            return ResponseEntity.ok(
                    calendarJigsawService.resolve(date, month, day, week, count, timeoutMsPerSolution));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ResolveResponse.error(1, ex.getMessage()));
        }
    }
}
