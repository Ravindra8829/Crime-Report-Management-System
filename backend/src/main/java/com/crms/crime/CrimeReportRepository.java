package com.crms.crime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrimeReportRepository extends JpaRepository<CrimeReport, Long> {
    List<CrimeReport> findByStatus(String status);
    List<CrimeReport> findByCategoryId(Long categoryId);
    List<CrimeReport> findByReportedById(Long reportedById);
} 