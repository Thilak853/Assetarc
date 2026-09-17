package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.HealthMetric;

@Repository
public interface HealthMetricRepository extends JpaRepository<HealthMetric, Long> {

    List<HealthMetric>findByAssetIdOrderByRecordedAtDesc(Long assetId);
    Optional<HealthMetric>findTopByAssetIdOrderByRecordedAtDesc(Long assetId);
} 