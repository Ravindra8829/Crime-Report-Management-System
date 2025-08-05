package com.crms.case_management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CaseService {

    @Autowired
    private CaseRepository caseRepository;

    public List<Case> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<Case> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public Case createCase(Case caseEntity) {
        return caseRepository.save(caseEntity);
    }

    public Case updateCase(Long id, Case caseDetails) {
        Case caseEntity = caseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Case not found"));

        caseEntity.setAssignedTo(caseDetails.getAssignedTo());
        caseEntity.setStatus(caseDetails.getStatus());
        caseEntity.setNotes(caseDetails.getNotes());

        if ("Closed".equals(caseDetails.getStatus())) {
            caseEntity.setClosedAt(LocalDateTime.now());
        }

        return caseRepository.save(caseEntity);
    }

    public void deleteCase(Long id) {
        caseRepository.deleteById(id);
    }

    public List<Case> getCasesByStatus(String status) {
        return caseRepository.findByStatus(status);
    }

    public List<Case> getCasesByAssignedTo(Long assignedToId) {
        return caseRepository.findByAssignedToId(assignedToId);
    }

    public Case closeCase(Long id) {
        Case caseEntity = caseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Case not found"));
        
        caseEntity.setStatus("Closed");
        caseEntity.setClosedAt(LocalDateTime.now());
        
        return caseRepository.save(caseEntity);
    }
} 