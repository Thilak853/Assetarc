package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.entity.MaintenanceSchedule;

import com.example.demo.entity.MaintenanceSchedule.MaintenanceType;
import com.example.demo.entity.MaintenanceSchedule.Priority;





public class ScheduleRequestDto {
    private Long assetId;
    private LocalDate plannedDate;
    private MaintenanceSchedule.MaintenanceType maintenanceType;
    private MaintenanceSchedule.Priority priority;
    public ScheduleRequestDto() {
    }
    public ScheduleRequestDto(Long assetId, LocalDate plannedDate, MaintenanceType maintenanceType, Priority priority) {
        this.assetId = assetId;
        this.plannedDate = plannedDate;
        this.maintenanceType = maintenanceType;
        this.priority = priority;
    }
    public Long getAssetId() {
        return assetId;
    }
    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }
    public LocalDate getPlannedDate() {
        return plannedDate;
    }
    public void setPlannedDate(LocalDate plannedDate) {
        this.plannedDate = plannedDate;
    }
    public MaintenanceSchedule.MaintenanceType getMaintenanceType() {
        return maintenanceType;
    }
    public void setMaintenanceType(MaintenanceSchedule.MaintenanceType maintenanceType) {
        this.maintenanceType = maintenanceType;
    }
    public MaintenanceSchedule.Priority getPriority() {
        return priority;
    }
    public void setPriority(MaintenanceSchedule.Priority priority) {
        this.priority = priority;
    }
   

    
}