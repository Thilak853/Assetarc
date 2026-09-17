
package com.example.demo.dto;

import java.math.BigDecimal;

public class LogRequestDto {

    private Long scheduleId;

    private Long assetId;

    private Long technicianId;

    private String workDescription;

    private String completionNotes;

    private String notes;

    private BigDecimal costIncurred;

    public LogRequestDto() {
    }

    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public Long getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(Long technicianId) {
        this.technicianId = technicianId;
    }

    public String getWorkDescription() {
        return workDescription;
    }

    public void setWorkDescription(
            String workDescription) {

        this.workDescription =
                workDescription;
    }

    public String getCompletionNotes() {
        return completionNotes;
    }

    public void setCompletionNotes(
            String completionNotes) {

        this.completionNotes =
                completionNotes;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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