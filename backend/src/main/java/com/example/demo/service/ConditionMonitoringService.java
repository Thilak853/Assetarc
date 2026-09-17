package com.example.demo.service;

import com.example.demo.dto.HealthMetricDto;
import com.example.demo.entity.HealthMetric;
import com.example.demo.entity.IndustrialAsset;
import com.example.demo.entity.IndustrialAsset.AssetStatus;
import com.example.demo.entity.MaintenanceSchedule;
import com.example.demo.entity.MaintenanceSchedule.MaintenanceType;
import com.example.demo.entity.MaintenanceSchedule.Priority;
import com.example.demo.entity.MaintenanceSchedule.ScheduleStatus;
import com.example.demo.repository.HealthMetricRepository;
import com.example.demo.repository.IndustrialAssetRepository;
import com.example.demo.repository.MaintenanceScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ConditionMonitoringService {

    private final HealthMetricRepository healthMetricRepository;
    private final IndustrialAssetRepository assetRepository;
    private final MaintenanceScheduleRepository scheduleRepository;

    public ConditionMonitoringService(HealthMetricRepository healthMetricRepository,
                                     IndustrialAssetRepository assetRepository,
                                     MaintenanceScheduleRepository scheduleRepository) {
        this.healthMetricRepository = healthMetricRepository;
        this.assetRepository = assetRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Transactional
    public void recordHealthMetric(HealthMetricDto dto) {
        // Load asset or throw exception
        IndustrialAsset asset = assetRepository.findById(dto.getAssetId())
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        // Create and save HealthMetric
        HealthMetric metric = new HealthMetric();
        metric.setAsset(asset);
        metric.setRecordedAt(LocalDateTime.now());
        metric.setHealthScore(dto.getHealthScore());
        metric.setVibrationLevel(dto.getVibrationLevel());
        metric.setTemperatureCelsius(dto.getTemperatureCelsius());

        healthMetricRepository.save(metric);

        // Auto-trigger emergency maintenance logic if healthScore < 40
        if (dto.getHealthScore() != null && dto.getHealthScore() < 40) {
            MaintenanceSchedule schedule = new MaintenanceSchedule();
            schedule.setAsset(asset);
            schedule.setPlannedDate(LocalDate.now());
            schedule.setMaintenanceType(MaintenanceType.REPAIR);
            schedule.setPriority(Priority.CRITICAL);
            schedule.setStatus(ScheduleStatus.PENDING);

            scheduleRepository.save(schedule);

            // Update asset status
            asset.setCurrentStatus(AssetStatus.UNDER_MAINTENANCE);
            assetRepository.save(asset);
        }
    }
}