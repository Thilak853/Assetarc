
package com.example.demo.controller;

import com.example.demo.dto.LogRequestDto;
import com.example.demo.dto.ScheduleRequestDto;
import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.MaintenanceSchedule;
import com.example.demo.service.MaintenanceService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(
            MaintenanceService maintenanceService) {

        this.maintenanceService =
                maintenanceService;
    }

    // =========================================================
    // GET ALL SCHEDULES
    // =========================================================

    @GetMapping("/schedules")
    @PreAuthorize(
            "hasAnyRole(" +
            "'SYSTEM_ADMIN'," +
            "'ASSET_MANAGER'," +
            "'MAINTENANCE_TECHNICIAN'," +
            "'OPERATIONS_SUPERVISOR'" +
            ")"
    )
    public ResponseEntity<List<MaintenanceSchedule>>
    getSchedules() {

        return ResponseEntity.ok(
                maintenanceService
                        .getUpcomingSchedules()
        );
    }

    // =========================================================
    // GET ALL LOGS
    // =========================================================

    @GetMapping("/logs")
    @PreAuthorize(
            "hasAnyRole(" +
            "'SYSTEM_ADMIN'," +
            "'ASSET_MANAGER'," +
            "'MAINTENANCE_TECHNICIAN'," +
            "'OPERATIONS_SUPERVISOR'" +
            ")"
    )
    public ResponseEntity<List<MaintenanceLog>>
    getLogs() {

        return ResponseEntity.ok(
                maintenanceService
                        .getAllLogs()
        );
    }

    // =========================================================
    // CREATE SCHEDULE
    // ADMIN + MANAGER + TECH + SUPERVISOR
    // =========================================================

    @PostMapping("/schedule")
    @PreAuthorize(
            "hasAnyRole(" +
            "'SYSTEM_ADMIN'," +
            "'ASSET_MANAGER'," +
            "'MAINTENANCE_TECHNICIAN'," +
            "'OPERATIONS_SUPERVISOR'" +
            ")"
    )
    public ResponseEntity<MaintenanceSchedule>
    scheduleMaintenance(
            @RequestBody ScheduleRequestDto dto) {

        return ResponseEntity.ok(
                maintenanceService
                        .scheduleMaintenance(dto)
        );
    }

    // =========================================================
    // COMPLETE MAINTENANCE
    // ADMIN + MANAGER + TECH
    // =========================================================

    @PostMapping("/complete")
    @PreAuthorize(
            "hasAnyRole(" +
            "'SYSTEM_ADMIN'," +
            "'ASSET_MANAGER'," +
            "'MAINTENANCE_TECHNICIAN'" +
            ")"
    )
    public ResponseEntity<MaintenanceLog>
    completeTask(
            @RequestBody LogRequestDto dto) {

        return ResponseEntity.ok(
                maintenanceService
                        .completeMaintenanceTask(dto)
        );
    }

    // =========================================================
    // DELETE MAINTENANCE LOG
    // ADMIN ONLY
    // =========================================================

    @DeleteMapping("/logs/{id}")
    @PreAuthorize(
            "hasRole('SYSTEM_ADMIN')"
    )
    public ResponseEntity<String> deleteLog(
            @PathVariable Long id) {

        maintenanceService.deleteLog(id);

        return ResponseEntity.ok(
                "MaintenanceLog deleted successfully."
        );
    }
}