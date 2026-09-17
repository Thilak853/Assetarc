package com.example.demo.service;

import com.example.demo.dto.AssetRequestDto;
import com.example.demo.entity.IndustrialAsset;
import com.example.demo.entity.IndustrialAsset.AssetStatus;
import com.example.demo.entity.MaintenanceSchedule;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.IndustrialAssetRepository;
import com.example.demo.repository.MaintenanceScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AssetService {

    private final IndustrialAssetRepository assetRepository;
    private final MaintenanceScheduleRepository scheduleRepository;

    public AssetService(IndustrialAssetRepository assetRepository,
                        MaintenanceScheduleRepository scheduleRepository) {
        this.assetRepository = assetRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public List<IndustrialAsset> getAllAssets() {
        return assetRepository.findAll();
    }

    public IndustrialAsset getAssetById(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));
    }

    @Transactional
    public IndustrialAsset createAsset(AssetRequestDto dto) {
        IndustrialAsset asset = new IndustrialAsset();
        if (dto != null) {
            if (dto.getName() != null) asset.setName(dto.getName());
            if (dto.getAssetTag() != null) asset.setAssetTag(dto.getAssetTag());
            if (dto.getCategory() != null) asset.setCategory(dto.getCategory());
            if (dto.getInstallDate() != null) asset.setInstallDate(dto.getInstallDate());
            if (dto.getPurchasePrice() != null) asset.setPurchasePrice(dto.getPurchasePrice());
            if (dto.getExpectedLifespanYears() != null) asset.setExpectedLifespanYears(dto.getExpectedLifespanYears());
        }
        asset.setCurrentStatus(AssetStatus.ACTIVE);

        return assetRepository.save(asset);
    }

    @Transactional
    public IndustrialAsset updateAsset(Long id, AssetRequestDto dto) {
        IndustrialAsset asset = getAssetById(id);
        if (dto != null) {
            if (dto.getName() != null) asset.setName(dto.getName());
            if (dto.getAssetTag() != null) asset.setAssetTag(dto.getAssetTag());
            if (dto.getCategory() != null) asset.setCategory(dto.getCategory());
            if (dto.getInstallDate() != null) asset.setInstallDate(dto.getInstallDate());
            if (dto.getPurchasePrice() != null) asset.setPurchasePrice(dto.getPurchasePrice());
            if (dto.getExpectedLifespanYears() != null) asset.setExpectedLifespanYears(dto.getExpectedLifespanYears());
        }

        return assetRepository.save(asset);
    }

    @Transactional
    public IndustrialAsset decommissionAsset(Long id) {
        IndustrialAsset asset = getAssetById(id);
        asset.setCurrentStatus(AssetStatus.DECOMMISSIONED);

        List<MaintenanceSchedule> pendingSchedules = scheduleRepository.findByAssetIdAndStatus(
                id, MaintenanceSchedule.ScheduleStatus.PENDING);
        if (pendingSchedules != null && !pendingSchedules.isEmpty()) {
            for (MaintenanceSchedule schedule : pendingSchedules) {
                schedule.setStatus(MaintenanceSchedule.ScheduleStatus.CANCELLED);
                scheduleRepository.save(schedule);
            }
        }

        return assetRepository.save(asset);
    }
}