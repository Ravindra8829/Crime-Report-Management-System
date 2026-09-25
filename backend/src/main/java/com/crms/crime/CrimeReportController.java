package com.crms.crime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class CrimeReportController {

    @Autowired
    private CrimeReportService crimeReportService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<CrimeReport>> getAllCrimeReports() {
        return ResponseEntity.ok(crimeReportService.getAllCrimeReports());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<CrimeReport> getCrimeReportById(@PathVariable Long id) {
        return crimeReportService.getCrimeReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<CrimeReport> createCrimeReport(@RequestBody CrimeReport crimeReport) {
        return ResponseEntity.ok(crimeReportService.createCrimeReport(crimeReport));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<CrimeReport> updateCrimeReport(@PathVariable Long id, @RequestBody CrimeReport crimeReportDetails) {
        try {
            CrimeReport updatedReport = crimeReportService.updateCrimeReport(id, crimeReportDetails);
            return ResponseEntity.ok(updatedReport);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCrimeReport(@PathVariable Long id) {
        crimeReportService.deleteCrimeReport(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<CrimeReport>> getCrimeReportsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(crimeReportService.getCrimeReportsByStatus(status));
    }

    @GetMapping("/category/{categoryId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<CrimeReport>> getCrimeReportsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(crimeReportService.getCrimeReportsByCategory(categoryId));
    }

    @GetMapping("/reporter/{reportedById}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<CrimeReport>> getCrimeReportsByReporter(@PathVariable Long reportedById) {
        return ResponseEntity.ok(crimeReportService.getCrimeReportsByReporter(reportedById));
    }
} 