
package com.example.demo.controller;

import com.example.demo.dto.HealthMetricDto;
import com.example.demo.service.ConditionMonitoringService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final ConditionMonitoringService monitoringService;


    public HealthController(
            ConditionMonitoringService monitoringService) {

        this.monitoringService =
                monitoringService;
    }


    /*
     * =====================================================
     * RECORD HEALTH METRIC
     *
     * ALL ROLES
     * =====================================================
     */

    @PostMapping("/record")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'," +
        "'MAINTENANCE_TECHNICIAN'," +
        "'OPERATIONS_SUPERVISOR'" +
        ")"
    )
    public ResponseEntity<Void>
    recordHealthMetric(
            @RequestBody HealthMetricDto dto) {

        monitoringService.recordHealthMetric(
                dto
        );

        return ResponseEntity.ok().build();
    }
}