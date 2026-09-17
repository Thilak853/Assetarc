package com.example.demo.dto;

import java.math.BigDecimal;



public class LogRequestDto {
    private Long scheduleId;
    private String workDescription;
    private BigDecimal costIncurred;
    private Long technicianId;
    public LogRequestDto() {
    }
    public LogRequestDto(Long scheduleId, String workDescription, BigDecimal costIncurred, Long technicianId) {
        this.scheduleId = scheduleId;
        this.workDescription = workDescription;
        this.costIncurred = costIncurred;
        this.technicianId = technicianId;
    }
    public Long getScheduleId() {
        return scheduleId;
    }
    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
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
    public Long getTechnicianId() {
        return technicianId;
    }
    public void setTechnicianId(Long technicianId) {
        this.technicianId = technicianId;
    }

    
    
}