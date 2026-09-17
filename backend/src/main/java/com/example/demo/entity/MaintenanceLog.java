
package com.example.demo.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_logs")
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "asset_id", nullable = false)
    private IndustrialAsset asset;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schedule_id", nullable = false)
    private MaintenanceSchedule schedule;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "technician_id", nullable = false)
    private SystemUser technician;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(name = "work_description")
    private String workDescription;

    @Column(name = "cost_incurred")
    private BigDecimal costIncurred;

    public MaintenanceLog() {
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

    public void setSchedule(
            MaintenanceSchedule schedule) {

        this.schedule = schedule;
    }

    public SystemUser getTechnician() {
        return technician;
    }

    public void setTechnician(
            SystemUser technician) {

        this.technician = technician;
    }

    public LocalDateTime getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(
            LocalDateTime completionDate) {

        this.completionDate =
                completionDate;
    }

    public String getWorkDescription() {
        return workDescription;
    }

    public void setWorkDescription(
            String workDescription) {

        this.workDescription =
                workDescription;
    }

    public BigDecimal getCostIncurred() {
        return costIncurred;
    }

    public void setCostIncurred(
            BigDecimal costIncurred) {

        this.costIncurred =
                costIncurred;
    }
}