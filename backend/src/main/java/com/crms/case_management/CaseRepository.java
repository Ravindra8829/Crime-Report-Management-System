package com.crms.case_management;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<Case, Long> {
    List<Case> findByStatus(String status);
    List<Case> findByAssignedToId(Long assignedToId);
} 