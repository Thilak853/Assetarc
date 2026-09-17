package com.example.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;


public class AssetRequestDto {
    private String assetTag;
    private String name;
    private String category;
    private LocalDate installDate;
    private BigDecimal purchasePrice;
    private Integer expectedLifespanYears;
    public AssetRequestDto() {
    }
    public AssetRequestDto(String assetTag, String name, String category, LocalDate installDate,
            BigDecimal purchasePrice, Integer expectedLifespanYears) {
        this.assetTag = assetTag;
        this.name = name;
        this.category = category;
        this.installDate = installDate;
        this.purchasePrice = purchasePrice;
        this.expectedLifespanYears = expectedLifespanYears;
    }
    public String getAssetTag() {
        return assetTag;
    }
    public void setAssetTag(String assetTag) {
        this.assetTag = assetTag;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public LocalDate getInstallDate() {
        return installDate;
    }
    public void setInstallDate(LocalDate installDate) {
        this.installDate = installDate;
    }
    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }
    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
    public Integer getExpectedLifespanYears() {
        return expectedLifespanYears;
    }
    public void setExpectedLifespanYears(Integer expectedLifespanYears) {
        this.expectedLifespanYears = expectedLifespanYears;
    }

    
}