package com.example.demo.controller;

import com.example.demo.dto.HealthMetricDto;
import com.example.demo.service.ConditionMonitoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/monitoring")
public class ConditionMonitoringController {

    private final ConditionMonitoringService monitoringService;

    public ConditionMonitoringController(ConditionMonitoringService monitoringService) {
        this.monitoringService = monitoringService;
    }

    @PostMapping("/metrics")
    public ResponseEntity<Void> recordMetric(@RequestBody HealthMetricDto dto) {
        monitoringService.recordHealthMetric(dto);
        return ResponseEntity.ok().build();
    }
}