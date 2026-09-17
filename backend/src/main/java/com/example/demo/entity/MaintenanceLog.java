package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="maintenance_logs")

public class MaintenanceLog {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="asset_id",nullable = false)
    private IndustrialAsset asset;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="schedule_id",unique = true)
    private MaintenanceSchedule schedule;
    @Column(name="completion_date",nullable = false)
    private LocalDateTime completionDate;
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="technician_id",nullable = false)
    private SystemUser technician;
    @Column(name="work_description",nullable = false,columnDefinition = "TEXT")
    private String workDescription;
    @Column(name="cost_incurred",nullable = false)
    private BigDecimal costIncurred;
    public MaintenanceLog() {
    }
    public MaintenanceLog(Long id, IndustrialAsset asset, MaintenanceSchedule schedule, LocalDateTime completionDate,
            SystemUser technicianId, String workDescription, BigDecimal costIncurred) {
        this.id = id;
        this.asset = asset;
        this.schedule = schedule;
        this.completionDate = completionDate;
        this.technician = technicianId;
        this.workDescription = workDescription;
        this.costIncurred = costIncurred;
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
    public MaintenanceSchedule getSchedule() {
        return schedule;
    }
    public void setSchedule(MaintenanceSchedule schedule) {
        this.schedule = schedule;
    }
    public LocalDateTime getCompletionDate() {
        return completionDate;
    }
    public void setCompletionDate(LocalDateTime completionDate) {
        this.completionDate = completionDate;
    }
    public SystemUser getTechnician() {
        return technician;
    }
    public void setTechnician(SystemUser technician) {
        this.technician = technician;
    }
    public String getWorkDescription() {
        return workDescription;
    }
    public void setWorkDescription(String workDescription) {
        this.workDescription = workDescription;
    }
    public BigDecimal getCostIncurred() {
        return costIncurred;
    }
    public void setCostIncurred(BigDecimal costIncurred) {
        this.costIncurred = costIncurred;
    }
    


}
