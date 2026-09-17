// package com.example.demo.controller;

// import com.example.demo.dto.DashboardStatsDto;
// import com.example.demo.service.DashboardService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/dashboard")
// public class DashboardController {

//     private final DashboardService dashboardService;

//     public DashboardController(DashboardService dashboardService) {
//         this.dashboardService = dashboardService;
//     }

//     @GetMapping("/stats")
//     @PreAuthorize("hasAnyRole('ASSET_MANAGER', 'OPERATIONS_SUPERVISOR', 'SYSTEM_ADMIN', 'MAINTENANCE_TECHNICIAN')")
//     public ResponseEntity<DashboardStatsDto> getGlobalStats() {
//         DashboardStatsDto stats = dashboardService.getGlobalStats();
//         return ResponseEntity.ok(stats);
//     }
// }
package com.example.demo.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/stats")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'," +
        "'MAINTENANCE_TECHNICIAN'," +
        "'OPERATIONS_SUPERVISOR'" +
        ")"
    )
    public ResponseEntity<Map<String, Object>>
    getDashboardStats() {

        Map<String, Object> stats =
                new HashMap<>();

        stats.put(
                "totalAssets",
                77
        );

        stats.put(
                "operational",
                48
        );

        stats.put(
                "maintenance",
                16
        );

        stats.put(
                "warning",
                9
        );

        stats.put(
                "critical",
                4
        );

        stats.put(
                "healthScore",
                84
        );

        return ResponseEntity.ok(
                stats
        );
    }
}