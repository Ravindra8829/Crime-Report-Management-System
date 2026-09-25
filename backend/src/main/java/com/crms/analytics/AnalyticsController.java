package com.crms.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        return ResponseEntity.ok(analyticsService.getDashboardData());
    }

    @GetMapping("/trends")
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
    public ResponseEntity<Map<String, Object>> getCrimeTrends() {
        return ResponseEntity.ok(analyticsService.getCrimeTrends());
    }

    @GetMapping("/case-stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'ANALYST')")
    public ResponseEntity<Map<String, Object>> getCaseResolutionStats() {
        return ResponseEntity.ok(analyticsService.getCaseResolutionStats());
    }
} 