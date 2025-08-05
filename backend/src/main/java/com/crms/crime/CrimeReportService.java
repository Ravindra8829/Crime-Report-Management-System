package com.crms.crime;

import com.crms.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrimeReportService {

    @Autowired
    private CrimeReportRepository crimeReportRepository;

    public List<CrimeReport> getAllCrimeReports() {
        return crimeReportRepository.findAll();
    }

    public Optional<CrimeReport> getCrimeReportById(Long id) {
        return crimeReportRepository.findById(id);
    }

    public CrimeReport createCrimeReport(CrimeReport crimeReport) {
        return crimeReportRepository.save(crimeReport);
    }

    public CrimeReport updateCrimeReport(Long id, CrimeReport crimeReportDetails) {
        CrimeReport crimeReport = crimeReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crime Report not found"));

        crimeReport.setTitle(crimeReportDetails.getTitle());
        crimeReport.setDescription(crimeReportDetails.getDescription());
        crimeReport.setCategory(crimeReportDetails.getCategory());
        crimeReport.setLocation(crimeReportDetails.getLocation());
        crimeReport.setLatitude(crimeReportDetails.getLatitude());
        crimeReport.setLongitude(crimeReportDetails.getLongitude());
        crimeReport.setStatus(crimeReportDetails.getStatus());

        return crimeReportRepository.save(crimeReport);
    }

    public void deleteCrimeReport(Long id) {
        crimeReportRepository.deleteById(id);
    }

    public List<CrimeReport> getCrimeReportsByStatus(String status) {
        return crimeReportRepository.findByStatus(status);
    }

    public List<CrimeReport> getCrimeReportsByCategory(Long categoryId) {
        return crimeReportRepository.findByCategoryId(categoryId);
    }

    public List<CrimeReport> getCrimeReportsByReporter(Long reportedById) {
        return crimeReportRepository.findByReportedById(reportedById);
    }
} 