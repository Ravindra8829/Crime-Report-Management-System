package com.crms.crime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CrimeCategoryRepository crimeCategoryRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICER', 'ANALYST')")
    public ResponseEntity<List<CrimeCategory>> getAllCategories() {
        return ResponseEntity.ok(crimeCategoryRepository.findAll());
    }
}
