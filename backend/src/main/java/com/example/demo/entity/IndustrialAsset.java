package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name="industrial_assets")



public class IndustrialAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="asset_tag",unique = true,nullable=false)
    
    private String assetTag;
    @Column(nullable=false)
    private String name;
    @Column(nullable=false)
    private String category;
    @Column(name="install_date",nullable=false)
    private LocalDate installDate;
    @Column(name="purchase_price",nullable=false)
    private BigDecimal purchasePrice;
    @Column(name="expected_lifespan_years",nullable=false)
    private Integer expectedLifespanYears;
    public enum AssetStatus{
        ACTIVE,UNDER_MAINTENANCE,DECOMMISSIONED
    }
    @Enumerated(EnumType.STRING)
    @Column(name="current_status",nullable=false)

    private AssetStatus currentStatus;
    @Column(name="current_health")
    private Integer currentHealth;
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @jakarta.persistence.PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
    }

    @jakarta.persistence.PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    public IndustrialAsset() {
    }
    public IndustrialAsset(Long id, String assetTag, String name, String category, LocalDate installDate,
            BigDecimal purchasePrice, Integer expectedLifespanYears, AssetStatus currentStatus, Integer currentHealth) {
        this.id = id;
        this.assetTag = assetTag;
        this.name = name;
        this.category = category;
        this.installDate = installDate;
        this.purchasePrice = purchasePrice;
        this.expectedLifespanYears = expectedLifespanYears;
        this.currentStatus = currentStatus;
        this.currentHealth = currentHealth;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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
    public AssetStatus getCurrentStatus() {
        return currentStatus;
    }
    public void setCurrentStatus(AssetStatus currentStatus) {
        this.currentStatus = currentStatus;
    }
    public Integer getCurrentHealth() {
        return currentHealth;
    }
    public void setCurrentHealth(Integer currentHealth) {
        this.currentHealth = currentHealth;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
   
    
    
}
