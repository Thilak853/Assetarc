
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

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceScheduleRepository scheduleRepository;
    private final MaintenanceLogRepository logRepository;
    private final IndustrialAssetRepository assetRepository;
    private final SystemUserRepository userRepository;

    public MaintenanceService(
            MaintenanceScheduleRepository scheduleRepository,
            MaintenanceLogRepository logRepository,
            IndustrialAssetRepository assetRepository,
            SystemUserRepository userRepository) {

        this.scheduleRepository = scheduleRepository;
        this.logRepository = logRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // GET ALL MAINTENANCE SCHEDULES
    // =========================================================

    public List<MaintenanceSchedule> getUpcomingSchedules() {

        /*
         * IMPORTANT:
         *
         * Do NOT use findByStatus(PENDING) here.
         *
         * If we return only PENDING schedules, a completed
         * maintenance schedule disappears from the frontend.
         *
         * We need:
         *
         * PENDING
         * OVERDUE - calculated by frontend
         * COMPLETED
         * CANCELLED
         * UNDER_MAINTENANCE
         */

        return scheduleRepository.findAll();
    }

    // =========================================================
    // GET ALL MAINTENANCE LOGS
    // =========================================================

    public List<MaintenanceLog> getAllLogs() {

        return logRepository.findAll();
    }

    // =========================================================
    // CREATE MAINTENANCE SCHEDULE
    // =========================================================

    @Transactional
    public MaintenanceSchedule scheduleMaintenance(
            ScheduleRequestDto dto) {

        if (dto == null) {

            throw new BusinessValidationException(
                    "Schedule request cannot be null"
            );
        }

        if (dto.getAssetId() == null) {

            throw new BusinessValidationException(
                    "Asset ID cannot be null"
            );
        }

        if (dto.getPlannedDate() == null) {

            throw new BusinessValidationException(
                    "Planned date cannot be null"
            );
        }

        if (dto.getMaintenanceType() == null) {

            throw new BusinessValidationException(
                    "Maintenance type cannot be null"
            );
        }

        if (dto.getPriority() == null) {

            throw new BusinessValidationException(
                    "Priority cannot be null"
            );
        }

        // -----------------------------------------------------
        // FIND ASSET
        // -----------------------------------------------------

        IndustrialAsset asset =
                assetRepository.findById(
                        dto.getAssetId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Asset not found"
                        )
                );

        // -----------------------------------------------------
        // CREATE SCHEDULE
        // -----------------------------------------------------

        MaintenanceSchedule schedule =
                new MaintenanceSchedule();

        schedule.setAsset(asset);

        schedule.setPlannedDate(
                dto.getPlannedDate()
        );

        schedule.setMaintenanceType(
                dto.getMaintenanceType()
        );

        schedule.setPriority(
                dto.getPriority()
        );

        // New maintenance always starts as PENDING
        schedule.setStatus(
                MaintenanceSchedule.ScheduleStatus.PENDING
        );

        // -----------------------------------------------------
        // HIGH / CRITICAL
        // -----------------------------------------------------

        if (dto.getPriority() ==
                MaintenanceSchedule.Priority.HIGH
                ||
            dto.getPriority() ==
                MaintenanceSchedule.Priority.CRITICAL) {

            asset.setCurrentStatus(
                    AssetStatus.UNDER_MAINTENANCE
            );

            assetRepository.save(asset);
        }

        return scheduleRepository.save(schedule);
    }

    // =========================================================
    // COMPLETE MAINTENANCE TASK
    // =========================================================

    @Transactional(rollbackFor = Exception.class)
    public MaintenanceLog completeMaintenanceTask(
            LogRequestDto dto) {

        if (dto == null) {

            throw new BusinessValidationException(
                    "Completion request cannot be null"
            );
        }

        if (dto.getScheduleId() == null) {

            throw new BusinessValidationException(
                    "Schedule ID cannot be null"
            );
        }

        // -----------------------------------------------------
        // FIND SCHEDULE
        // -----------------------------------------------------

        MaintenanceSchedule schedule =
                scheduleRepository.findById(
                        dto.getScheduleId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Schedule not found"
                        )
                );

        // -----------------------------------------------------
        // ALREADY COMPLETED
        // -----------------------------------------------------

        if (schedule.getStatus() ==
                MaintenanceSchedule.ScheduleStatus.COMPLETED) {

            throw new BusinessValidationException(
                    "Task is already completed"
            );
        }

        // -----------------------------------------------------
        // CANCELLED
        // -----------------------------------------------------

        if (schedule.getStatus() ==
                MaintenanceSchedule.ScheduleStatus.CANCELLED) {

            throw new BusinessValidationException(
                    "Task is cancelled"
            );
        }

        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        SystemUser technician = null;

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && authentication.getName() != null
                && !authentication.getName()
                        .equals("anonymousUser")) {

            technician =
                    userRepository
                            .findByUsername(
                                    authentication.getName()
                            )
                            .orElse(null);
        }

        // -----------------------------------------------------
        // FALLBACK TECHNICIAN ID
        // -----------------------------------------------------

        if (technician == null
                && dto.getTechnicianId() != null) {

            technician =
                    userRepository
                            .findById(
                                    dto.getTechnicianId()
                            )
                            .orElse(null);
        }

        // -----------------------------------------------------
        // FALLBACK TO FIRST TECHNICIAN
        // -----------------------------------------------------

        if (technician == null) {

            technician =
                    userRepository
                            .findAll()
                            .stream()
                            .filter(user ->
                                    user.getRole()
                                            ==
                                    SystemUser.Role
                                            .MAINTENANCE_TECHNICIAN
                            )
                            .findFirst()
                            .orElse(null);
        }

        if (technician == null) {

            throw new ResourceNotFoundException(
                    "No maintenance technician found"
            );
        }

        // =====================================================
        // CREATE MAINTENANCE LOG
        // =====================================================

        MaintenanceLog log =
                new MaintenanceLog();

        log.setAsset(
                schedule.getAsset()
        );

        log.setSchedule(
                schedule
        );

        log.setCompletionDate(
                LocalDateTime.now()
        );

        log.setTechnician(
                technician
        );

        // -----------------------------------------------------
        // WORK DESCRIPTION
        // -----------------------------------------------------

        String description =
                dto.getWorkDescription();

        if (description == null) {
            description = "";
        }

        log.setWorkDescription(
                description
        );

        // -----------------------------------------------------
        // COST
        // -----------------------------------------------------

        BigDecimal cost =
                dto.getCostIncurred();

        if (cost == null) {
            cost = BigDecimal.ZERO;
        }

        if (cost.compareTo(
                BigDecimal.ZERO
        ) < 0) {

            throw new BusinessValidationException(
                    "Maintenance cost cannot be negative"
            );
        }

        log.setCostIncurred(cost);

        // -----------------------------------------------------
        // SAVE LOG
        // -----------------------------------------------------

        MaintenanceLog savedLog =
                logRepository.save(log);

        // =====================================================
        // IMPORTANT:
        // CHANGE SCHEDULE TO COMPLETED
        // =====================================================

        schedule.setStatus(
                MaintenanceSchedule.ScheduleStatus.COMPLETED
        );

        scheduleRepository.save(schedule);

        // =====================================================
        // UPDATE ASSET
        // =====================================================

        IndustrialAsset asset =
                schedule.getAsset();

        if (asset != null) {

            asset.setCurrentStatus(
                    AssetStatus.ACTIVE
            );

            /*
             * Maintenance successfully completed.
             * Reset current health to 100.
             */
            asset.setCurrentHealth(100);

            assetRepository.save(asset);
        }

        return savedLog;
    }

    // =========================================================
    // DELETE MAINTENANCE LOG
    // =========================================================

    @Transactional
    public void deleteLog(Long id) {

        if (id == null) {

            throw new BusinessValidationException(
                    "Maintenance log ID cannot be null"
            );
        }

        logRepository.deleteById(id);
    }
}