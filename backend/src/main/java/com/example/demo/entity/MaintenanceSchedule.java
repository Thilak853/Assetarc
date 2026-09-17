package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="maintenance_schedule")

public class MaintenanceSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="asset_id",nullable = false)
    private IndustrialAsset asset;
    @Column(name="planned_date",nullable = false)
    private LocalDate plannedDate;
    public enum MaintenanceType{
       ROUTINE,REPAIR,INSPECTION;

    

    }
    @Enumerated(EnumType.STRING)
    @Column(name="maintenance_type",nullable = false)
    private MaintenanceType maintenanceType;
    public enum Priority{
        LOW,MEDIUM,HIGH,CRITICAL;

        
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;
    public enum ScheduleStatus {
        PENDING,COMPLETED,CANCELLED, UNDER_MAINTENANCE
}

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleStatus status;

    public MaintenanceSchedule() {
    }

    public MaintenanceSchedule(Long id, IndustrialAsset asset, LocalDate plannedDate, MaintenanceType maintenanceType,
            Priority priority, ScheduleStatus status) {
        this.id = id;
        this.asset = asset;
        this.plannedDate = plannedDate;
        this.maintenanceType = maintenanceType;
        this.priority = priority;
        this.status = status;
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

    public LocalDate getPlannedDate() {
        return plannedDate;
    }

    public void setPlannedDate(LocalDate plannedDate) {
        this.plannedDate = plannedDate;
    }

    public MaintenanceType getMaintenanceType() {
        return maintenanceType;
    }

    public void setMaintenanceType(MaintenanceType maintenanceType) {
        this.maintenanceType = maintenanceType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public ScheduleStatus getStatus() {
        return status;
    }

    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }

    

}
