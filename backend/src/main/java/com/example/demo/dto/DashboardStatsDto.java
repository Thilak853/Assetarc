package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.Map;




public class DashboardStatsDto {
    private long totalAssets;
    private long activeMaintenanceCount;
    private double averageHealthScore;
    private BigDecimal totalFleetValue;
    private Map<String,Long> statusDistribution;
    public DashboardStatsDto() {
    }
    public DashboardStatsDto(long totalAssets, long activeMaintenanceCount, double averageHealthScore,
            BigDecimal totalFleetValue, Map<String, Long> statusDistribution) {
        this.totalAssets = totalAssets;
        this.activeMaintenanceCount = activeMaintenanceCount;
        this.averageHealthScore = averageHealthScore;
        this.totalFleetValue = totalFleetValue;
        this.statusDistribution = statusDistribution;
    }
    public long getTotalAssets() {
        return totalAssets;
    }
    public void setTotalAssets(long totalAssets) {
        this.totalAssets = totalAssets;
    }
    public long getActiveMaintenanceCount() {
        return activeMaintenanceCount;
    }
    public void setActiveMaintenanceCount(long activeMaintenanceCount) {
        this.activeMaintenanceCount = activeMaintenanceCount;
    }
    public double getAverageHealthScore() {
        return averageHealthScore;
    }
    public void setAverageHealthScore(double averageHealthScore) {
        this.averageHealthScore = averageHealthScore;
    }
    public BigDecimal getTotalFleetValue() {
        return totalFleetValue;
    }
    public void setTotalFleetValue(BigDecimal totalFleetValue) {
        this.totalFleetValue = totalFleetValue;
    }
    public Map<String, Long> getStatusDistribution() {
        return statusDistribution;
    }
    public void setStatusDistribution(Map<String, Long> statusDistribution) {
        this.statusDistribution = statusDistribution;
    }
    
    


}