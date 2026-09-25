package com.crms.crime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrimeCategoryRepository extends JpaRepository<CrimeCategory, Long> {
}
