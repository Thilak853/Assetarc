package com.example.demo.dto;





public class HealthMetricDto {
    private Long assetId;
    private Integer healthScore;
    private Double vibrationLevel;
    private Double temperatureCelsius;
    public HealthMetricDto() {
    }
    public HealthMetricDto(Long assetId, Integer healthScore, Double vibrationLevel, Double temperatureCelsius) {
        this.assetId = assetId;
        this.healthScore = healthScore;
        this.vibrationLevel = vibrationLevel;
        this.temperatureCelsius = temperatureCelsius;
    }
    public Long getAssetId() {
        return assetId;
    }
    public void setAssetId(Long assetId) {
        this.assetId = assetId;
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