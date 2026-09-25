package com.crms.case_management;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CaseServiceTest {

    @Mock
    private CaseRepository caseRepository;

    @InjectMocks
    private CaseService caseService;

    @Test
    void updateCaseCopiesDetailsAndClosesClosedCases() {
        Case existing = new Case();
        Case details = new Case();
        details.setStatus("Closed");
        details.setNotes("Resolved");
        when(caseRepository.findById(10L)).thenReturn(Optional.of(existing));
        when(caseRepository.save(existing)).thenReturn(existing);

        Case result = caseService.updateCase(10L, details);

        assertSame(existing, result);
        assertEquals("Closed", existing.getStatus());
        assertEquals("Resolved", existing.getNotes());
        assertNotNull(existing.getClosedAt());
        verify(caseRepository).save(existing);
    }

    @Test
    void updateCaseDoesNotSetClosedAtForOpenCases() {
        Case existing = new Case();
        Case details = new Case();
        details.setStatus("Open");
        when(caseRepository.findById(10L)).thenReturn(Optional.of(existing));
        when(caseRepository.save(existing)).thenReturn(existing);

        caseService.updateCase(10L, details);

        assertEquals("Open", existing.getStatus());
        assertNull(existing.getClosedAt());
    }

    @Test
    void updateCaseThrowsWhenCaseDoesNotExist() {
        when(caseRepository.findById(10L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> caseService.updateCase(10L, new Case()));

        assertEquals("Case not found", exception.getMessage());
        verify(caseRepository, never()).save(any());
    }

    @Test
    void closeCaseSetsStatusAndClosedAt() {
        Case existing = new Case();
        when(caseRepository.findById(10L)).thenReturn(Optional.of(existing));
        when(caseRepository.save(existing)).thenReturn(existing);

        Case result = caseService.closeCase(10L);

        assertSame(existing, result);
        assertEquals("Closed", existing.getStatus());
        assertNotNull(existing.getClosedAt());
    }
}
