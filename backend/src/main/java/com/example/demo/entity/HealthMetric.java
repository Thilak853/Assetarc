package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

 import jakarta.persistence.Table;

@Table(name="health_metrics")

@Entity

public class HealthMetric {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="asset_id",nullable=false)
    private IndustrialAsset asset;
    @Column(name="recorded_at",nullable=false)
    private LocalDateTime recordedAt;
    @Column(name="health_score",nullable=false)
    private Integer healthScore;
    @Column(name="vibration_level")
    private Double vibrationLevel;
    @Column(name="temperature_celsius")
    private Double temperatureCelsius;
    public HealthMetric() {
    }
    public HealthMetric(Long id, IndustrialAsset asset, LocalDateTime recordedAt, Integer healthScore,
            Double vibrationLevel, Double temperatureCelsius) {
        this.id = id;
        this.asset = asset;
        this.recordedAt = recordedAt;
        this.healthScore = healthScore;
        this.vibrationLevel = vibrationLevel;
        this.temperatureCelsius = temperatureCelsius;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public IndustrialAsset getAsset() {
        return asset;
    }
    public void setAsset(IndustrialAsset asset) {
        this.asset = asset;
    }
    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }
    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }
    public Integer getHealthScore() {
        return healthScore;
    }
    public void setHealthScore(Integer healthScore) {
        this.healthScore = healthScore;
    }
    public Double getVibrationLevel() {
        return vibrationLevel;
    }
    public void setVibrationLevel(Double vibrationLevel) {
        this.vibrationLevel = vibrationLevel;
    }
    public Double getTemperatureCelsius() {
        return temperatureCelsius;
    }
    public void setTemperatureCelsius(Double temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }


}
