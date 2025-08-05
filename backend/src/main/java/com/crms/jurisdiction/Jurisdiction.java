package com.crms.jurisdiction;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jurisdictions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Jurisdiction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String region;
} 