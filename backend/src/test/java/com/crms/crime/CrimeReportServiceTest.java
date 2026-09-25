package com.crms.crime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CrimeReportServiceTest {

    @Mock
    private CrimeReportRepository crimeReportRepository;

    @InjectMocks
    private CrimeReportService crimeReportService;

    @Test
    void updateCrimeReportCopiesAllEditableFields() {
        CrimeReport existing = new CrimeReport();
        CrimeReport details = new CrimeReport();
        details.setTitle("Updated title");
        details.setDescription("Updated description");
        details.setLocation("Updated location");
        details.setLatitude(12.34);
        details.setLongitude(56.78);
        details.setStatus("Under Investigation");
        when(crimeReportRepository.findById(4L)).thenReturn(Optional.of(existing));
        when(crimeReportRepository.save(existing)).thenReturn(existing);

        CrimeReport result = crimeReportService.updateCrimeReport(4L, details);

        assertSame(existing, result);
        assertEquals("Updated title", existing.getTitle());
        assertEquals("Updated description", existing.getDescription());
        assertEquals("Updated location", existing.getLocation());
        assertEquals(12.34, existing.getLatitude());
        assertEquals(56.78, existing.getLongitude());
        assertEquals("Under Investigation", existing.getStatus());
        verify(crimeReportRepository).save(existing);
    }

    @Test
    void updateCrimeReportThrowsWhenReportDoesNotExist() {
        when(crimeReportRepository.findById(4L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> crimeReportService.updateCrimeReport(4L, new CrimeReport()));

        assertEquals("Crime Report not found", exception.getMessage());
        verify(crimeReportRepository, never()).save(any());
    }

    @Test
    void delegatesStatusAndReporterQueries() {
        crimeReportService.getCrimeReportsByStatus("Open");
        crimeReportService.getCrimeReportsByReporter(8L);

        verify(crimeReportRepository).findByStatus("Open");
        verify(crimeReportRepository).findByReportedById(8L);
    }
}
