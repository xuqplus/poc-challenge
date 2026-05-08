package com.example.jigsawapi.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.jigsawapi.service.CalendarJigsawMrvService;
import com.example.jigsawapi.service.CalendarJigsawService;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/** Standalone MockMvc (no servlet auto-config) for compatibility with Spring Boot 4 module layout. */
class ResolveControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(
                        new ResolveController(
                                new CalendarJigsawService(Caffeine.newBuilder().build()),
                                new CalendarJigsawMrvService()))
                .build();
    }

    @Test
    void resolve_ok_withReadmeParams() throws Exception {
        mockMvc.perform(get("/resolve")
                        .param("month", "10")
                        .param("day", "10")
                        .param("week", "5")
                        .param("count", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.month").value(10))
                .andExpect(jsonPath("$.day").value(10))
                .andExpect(jsonPath("$.week").value(5))
                .andExpect(jsonPath("$.count").value(3))
                .andExpect(jsonPath("$.data.length()").value(3))
                .andExpect(jsonPath("$.data[0].matrix.length()").value(8))
                .andExpect(jsonPath("$.data[0].matrix[0].length()").value(7));
    }

    @Test
    void resolve_ok_withPlay14DateQuery() throws Exception {
        mockMvc.perform(get("/resolve").param("date", "11/11/2022").param("count", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.count").value(2))
                .andExpect(jsonPath("$.data.length()").value(2));
    }

    @Test
    void resolve_badRequest_withoutInputs() throws Exception {
        mockMvc.perform(get("/resolve"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(1));
    }

    @Test
    void resolve_mrvSolver_returnsOk() throws Exception {
        mockMvc.perform(get("/resolve")
                        .param("date", "11/11/2022")
                        .param("count", "2")
                        .param("solver", "mrv"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(0))
                .andExpect(jsonPath("$.count").value(2));
    }
}
