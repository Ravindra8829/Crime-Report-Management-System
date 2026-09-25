package com.crms.case_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "*")
public class CaseController {

    @Autowired
    private CaseService caseService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Case>> getAllCases() {
        return ResponseEntity.ok(caseService.getAllCases());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<Case> getCaseById(@PathVariable Long id) {
        return caseService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<Case> createCase(@RequestBody Case caseEntity) {
        return ResponseEntity.ok(caseService.createCase(caseEntity));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<Case> updateCase(@PathVariable Long id, @RequestBody Case caseDetails) {
        try {
            Case updatedCase = caseService.updateCase(id, caseDetails);
            return ResponseEntity.ok(updatedCase);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        caseService.deleteCase(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Case>> getCasesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(caseService.getCasesByStatus(status));
    }

    @GetMapping("/assigned/{assignedToId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<Case>> getCasesByAssignedTo(@PathVariable Long assignedToId) {
        return ResponseEntity.ok(caseService.getCasesByAssignedTo(assignedToId));
    }

    @PutMapping("/{id}/close")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER')")
    public ResponseEntity<Case> closeCase(@PathVariable Long id) {
        try {
            Case closedCase = caseService.closeCase(id);
            return ResponseEntity.ok(closedCase);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 