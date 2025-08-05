package com.crms.analytics;

import com.crms.crime.CrimeReport;
import com.crms.crime.CrimeReportRepository;
import com.crms.case_management.Case;
import com.crms.case_management.CaseRepository;
import com.crms.user.User;
import com.crms.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private CrimeReportRepository crimeReportRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Total counts
        long totalReports = crimeReportRepository.count();
        long totalCases = caseRepository.count();
        long totalUsers = userRepository.count();
        
        // Status breakdowns
        long openReports = crimeReportRepository.findByStatus("Open").size();
        long closedReports = crimeReportRepository.findByStatus("Closed").size();
        long openCases = caseRepository.findByStatus("Open").size();
        long closedCases = caseRepository.findByStatus("Closed").size();
        
        // Recent activity (last 30 days)
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);
        long recentReports = crimeReportRepository.findAll().stream()
                .filter(report -> report.getCreatedAt().isAfter(thirtyDaysAgo))
                .count();
        
        dashboardData.put("totalReports", totalReports);
        dashboardData.put("totalCases", totalCases);
        dashboardData.put("totalUsers", totalUsers);
        dashboardData.put("openReports", openReports);
        dashboardData.put("closedReports", closedReports);
        dashboardData.put("openCases", openCases);
        dashboardData.put("closedCases", closedCases);
        dashboardData.put("recentReports", recentReports);
        
        return dashboardData;
    }

    public Map<String, Object> getCrimeTrends() {
        Map<String, Object> trends = new HashMap<>();
        
        // Get reports by category
        List<CrimeReport> allReports = crimeReportRepository.findAll();
        Map<String, Long> categoryCounts = allReports.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    report -> report.getCategory().getName(),
                    java.util.stream.Collectors.counting()
                ));
        
        trends.put("categoryBreakdown", categoryCounts);
        
        // Monthly trends (last 6 months)
        Map<String, Long> monthlyTrends = new HashMap<>();
        for (int i = 0; i < 6; i++) {
            LocalDateTime monthStart = LocalDateTime.now().minus(i, ChronoUnit.MONTHS);
            LocalDateTime monthEnd = monthStart.plus(1, ChronoUnit.MONTHS);
            
            long count = allReports.stream()
                    .filter(report -> report.getCreatedAt().isAfter(monthStart) && 
                                    report.getCreatedAt().isBefore(monthEnd))
                    .count();
            
            monthlyTrends.put(monthStart.getMonth().toString(), count);
        }
        
        trends.put("monthlyTrends", monthlyTrends);
        
        return trends;
    }

    public Map<String, Object> getCaseResolutionStats() {
        Map<String, Object> stats = new HashMap<>();
        
        List<Case> allCases = caseRepository.findAll();
        long totalCases = allCases.size();
        long resolvedCases = allCases.stream()
                .filter(caseEntity -> "Closed".equals(caseEntity.getStatus()))
                .count();
        
        double resolutionRate = totalCases > 0 ? (double) resolvedCases / totalCases * 100 : 0;
        
        // Average resolution time
        double avgResolutionTime = allCases.stream()
                .filter(caseEntity -> caseEntity.getClosedAt() != null)
                .mapToLong(caseEntity -> 
                    ChronoUnit.DAYS.between(caseEntity.getOpenedAt(), caseEntity.getClosedAt()))
                .average()
                .orElse(0.0);
        
        stats.put("totalCases", totalCases);
        stats.put("resolvedCases", resolvedCases);
        stats.put("resolutionRate", resolutionRate);
        stats.put("avgResolutionTime", avgResolutionTime);
        
        return stats;
    }
} 