package com.crms.crime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crime_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrimeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
} 