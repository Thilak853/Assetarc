package com.example.demo.service;

import com.example.demo.dto.LogRequestDto;
import com.example.demo.dto.ScheduleRequestDto;
import com.example.demo.entity.IndustrialAsset;
import com.example.demo.entity.IndustrialAsset.AssetStatus;
import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.MaintenanceSchedule;
import com.example.demo.entity.SystemUser;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.IndustrialAssetRepository;
import com.example.demo.repository.MaintenanceLogRepository;
import com.example.demo.repository.MaintenanceScheduleRepository;
import com.example.demo.repository.SystemUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceScheduleRepository scheduleRepository;
    private final MaintenanceLogRepository logRepository;
    private final IndustrialAssetRepository assetRepository;
    private final SystemUserRepository userRepository;

    public MaintenanceService(MaintenanceScheduleRepository scheduleRepository,
                              MaintenanceLogRepository logRepository,
                              IndustrialAssetRepository assetRepository,
                              SystemUserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.logRepository = logRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    public List<MaintenanceSchedule> getUpcomingSchedules() {
        return scheduleRepository.findByStatus(MaintenanceSchedule.ScheduleStatus.PENDING);
    }

    public List<MaintenanceLog> getAllLogs() {
        return logRepository.findAll();
    }

    @Transactional
    public MaintenanceSchedule scheduleMaintenance(ScheduleRequestDto dto) {
        IndustrialAsset asset = assetRepository.findById(dto.getAssetId())
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        MaintenanceSchedule schedule = new MaintenanceSchedule();
        schedule.setAsset(asset);
        schedule.setPlannedDate(dto.getPlannedDate());
        schedule.setMaintenanceType(dto.getMaintenanceType());
        schedule.setPriority(dto.getPriority());
        schedule.setStatus(MaintenanceSchedule.ScheduleStatus.PENDING);

        if (dto.getPriority() == MaintenanceSchedule.Priority.HIGH || 
            dto.getPriority() == MaintenanceSchedule.Priority.CRITICAL) {
            asset.setCurrentStatus(AssetStatus.UNDER_MAINTENANCE);
            assetRepository.save(asset);
        }

        return scheduleRepository.save(schedule);
    }

    @Transactional(rollbackFor = Exception.class)
    public MaintenanceLog completeMaintenanceTask(LogRequestDto dto) {
        MaintenanceSchedule schedule = scheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new ResourceNotFoundException("Schedule not found"));

        if (schedule.getStatus() != MaintenanceSchedule.ScheduleStatus.PENDING) {
            throw new BusinessValidationException("Task is already processed or cancelled");
        }

        SystemUser technician = userRepository.findById(dto.getTechnicianId())
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        MaintenanceLog log = new MaintenanceLog();
        log.setAsset(schedule.getAsset());
        log.setSchedule(schedule);
        log.setCompletionDate(LocalDateTime.now());
        log.setTechnician(technician);
        log.setWorkDescription(dto.getWorkDescription());
        log.setCostIncurred(dto.getCostIncurred());

        MaintenanceLog savedLog = logRepository.save(log);

        schedule.setStatus(MaintenanceSchedule.ScheduleStatus.COMPLETED);
        scheduleRepository.save(schedule);

        IndustrialAsset asset = schedule.getAsset();
        if (asset != null) {
            asset.setCurrentStatus(AssetStatus.ACTIVE);
            asset.setCurrentHealth(100);
            assetRepository.save(asset);
        }

        return savedLog;
    }

    @Transactional
    public void deleteLog(Long id) {
        
        try {
            logRepository.deleteById(id);
        } catch (Exception e) {
            
        }
    }
}