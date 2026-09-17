// // // package com.example.demo.controller;

// // // import com.example.demo.dto.LogRequestDto;
// // // import com.example.demo.dto.ScheduleRequestDto;
// // // import com.example.demo.entity.MaintenanceLog;
// // // import com.example.demo.entity.MaintenanceSchedule;
// // // import com.example.demo.service.MaintenanceService;
// // // import org.springframework.http.HttpStatus;
// // // import org.springframework.http.ResponseEntity;
// // // import org.springframework.security.access.prepost.PreAuthorize;
// // // import org.springframework.web.bind.annotation.*;

// // // import java.util.List;

// // // @RestController
// // // @RequestMapping("/api/maintenance")
// // // public class MaintenanceController {

// // //     private final MaintenanceService maintenanceService;

// // //     public MaintenanceController(MaintenanceService maintenanceService) {
// // //         this.maintenanceService = maintenanceService;
// // //     }

// // //     @GetMapping("/schedules")
// // //     public ResponseEntity<List<MaintenanceSchedule>> getUpcomingSchedules() {
// // //         return ResponseEntity.ok(maintenanceService.getUpcomingSchedules());
// // //     }

// // //     @GetMapping("/logs")
// // //     public ResponseEntity<List<MaintenanceLog>> getAllLogs() {
// // //         return ResponseEntity.ok(maintenanceService.getAllLogs());
// // //     }

// // //     @PostMapping("/schedule")
// // //     @PreAuthorize("hasRole('ADMIN')")
// // //     public ResponseEntity<MaintenanceSchedule> scheduleMaintenance(@RequestBody ScheduleRequestDto dto) {
// // //         return ResponseEntity.status(HttpStatus.CREATED).body(maintenanceService.scheduleMaintenance(dto));
// // //     }

// // //     @PostMapping("/complete")
// // //     @PreAuthorize("hasRole('MAINTENANCE_TECHNICIAN')")
// // //     public ResponseEntity<MaintenanceLog> completeTask(@RequestBody LogRequestDto dto) {
// // //         return ResponseEntity.ok(maintenanceService.completeMaintenanceTask(dto));
// // //     }

// // //     // t12: Expects ResponseEntity<String> with body "MaintenanceLog deleted successfully."
// // //     @DeleteMapping("/logs/{id}")
// // //     @PreAuthorize("hasRole('ADMIN')")
// // //     public ResponseEntity<String> deleteLog(@PathVariable Long id) {
// // //         maintenanceService.deleteLog(id);
// // //         return ResponseEntity.ok("MaintenanceLog deleted successfully.");
// // //     }
// // // }
// // package com.example.demo.controller;

// // import com.example.demo.dto.LogRequestDto;
// // import com.example.demo.dto.ScheduleRequestDto;
// // import com.example.demo.entity.MaintenanceLog;
// // import com.example.demo.entity.MaintenanceSchedule;
// // import com.example.demo.service.MaintenanceService;
// // import org.springframework.http.HttpStatus;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.security.access.prepost.PreAuthorize;
// // import org.springframework.web.bind.annotation.*;

// // import java.util.List;

// // @RestController
// // @RequestMapping("/api/maintenance")
// // public class MaintenanceController {

// //     private final MaintenanceService maintenanceService;

// //     public MaintenanceController(MaintenanceService maintenanceService) {
// //         this.maintenanceService = maintenanceService;
// //     }

// //     // All four roles can view maintenance schedules
// //     @GetMapping("/schedules")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER',
// //             'MAINTENANCE_TECHNICIAN',
// //             'OPERATIONS_SUPERVISOR'
// //         )
// //     """)
// //     public ResponseEntity<List<MaintenanceSchedule>> getUpcomingSchedules() {
// //         return ResponseEntity.ok(
// //                 maintenanceService.getUpcomingSchedules()
// //         );
// //     }

// //     // All four roles can view maintenance logs
// //     @GetMapping("/logs")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER',
// //             'MAINTENANCE_TECHNICIAN',
// //             'OPERATIONS_SUPERVISOR'
// //         )
// //     """)
// //     public ResponseEntity<List<MaintenanceLog>> getAllLogs() {
// //         return ResponseEntity.ok(
// //                 maintenanceService.getAllLogs()
// //         );
// //     }

// //     // Admin and Asset Manager can schedule maintenance
// //     @PostMapping("/schedule")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER'
// //         )
// //     """)
// //     public ResponseEntity<MaintenanceSchedule> scheduleMaintenance(
// //             @RequestBody ScheduleRequestDto dto) {

// //         return ResponseEntity
// //                 .status(HttpStatus.CREATED)
// //                 .body(maintenanceService.scheduleMaintenance(dto));
// //     }

// //     // Technician completes maintenance tasks
// //     @PostMapping("/complete")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'MAINTENANCE_TECHNICIAN'
// //         )
// //     """)
// //     public ResponseEntity<MaintenanceLog> completeTask(
// //             @RequestBody LogRequestDto dto) {

// //         return ResponseEntity.ok(
// //                 maintenanceService.completeMaintenanceTask(dto)
// //         );
// //     }

// //     // Admin can delete maintenance logs
// //     @DeleteMapping("/logs/{id}")
// //     @PreAuthorize("hasRole('SYSTEM_ADMIN')")
// //     public ResponseEntity<String> deleteLog(@PathVariable Long id) {

// //         maintenanceService.deleteLog(id);

// //         return ResponseEntity.ok(
// //                 "MaintenanceLog deleted successfully."
// //         );
// //     }
// // }
// package com.example.demo.controller;

// import com.example.demo.dto.LogRequestDto;
// import com.example.demo.dto.ScheduleRequestDto;
// import com.example.demo.entity.MaintenanceLog;
// import com.example.demo.entity.MaintenanceSchedule;
// import com.example.demo.service.MaintenanceService;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;

// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/maintenance")
// @CrossOrigin
// public class MaintenanceController {

//     private final MaintenanceService maintenanceService;

//     public MaintenanceController(
//             MaintenanceService maintenanceService) {

//         this.maintenanceService =
//                 maintenanceService;
//     }

//     @GetMapping("/schedules")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER',
//             'MAINTENANCE_TECHNICIAN',
//             'OPERATIONS_SUPERVISOR'
//         )
//     """)
//     public ResponseEntity<List<MaintenanceSchedule>>
//     getUpcomingSchedules() {

//         return ResponseEntity.ok(
//                 maintenanceService
//                         .getUpcomingSchedules()
//         );
//     }

//     @GetMapping("/logs")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER',
//             'MAINTENANCE_TECHNICIAN',
//             'OPERATIONS_SUPERVISOR'
//         )
//     """)
//     public ResponseEntity<List<MaintenanceLog>>
//     getAllLogs() {

//         return ResponseEntity.ok(
//                 maintenanceService.getAllLogs()
//         );
//     }

//     @PostMapping("/schedule")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER'
//         )
//     """)
//     public ResponseEntity<MaintenanceSchedule>
//     scheduleMaintenance(
//             @RequestBody ScheduleRequestDto dto) {

//         return ResponseEntity
//                 .status(HttpStatus.CREATED)
//                 .body(
//                         maintenanceService
//                                 .scheduleMaintenance(dto)
//                 );
//     }

//     @PostMapping("/complete")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'MAINTENANCE_TECHNICIAN'
//         )
//     """)
//     public ResponseEntity<MaintenanceLog>
//     completeTask(
//             @RequestBody LogRequestDto dto) {

//         return ResponseEntity.ok(
//                 maintenanceService
//                         .completeMaintenanceTask(dto)
//         );
//     }

//     @DeleteMapping("/logs/{id}")
//     @PreAuthorize("""
//         hasRole('SYSTEM_ADMIN')
//     """)
//     public ResponseEntity<String> deleteLog(
//             @PathVariable Long id) {

//         maintenanceService.deleteLog(id);

//         return ResponseEntity.ok(
//                 "MaintenanceLog deleted successfully."
//         );
//     }
// }
package com.example.demo.controller;

import com.example.demo.dto.LogRequestDto;
import com.example.demo.dto.ScheduleRequestDto;

import com.example.demo.entity.MaintenanceLog;
import com.example.demo.entity.MaintenanceSchedule;

import com.example.demo.service.MaintenanceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;


    public MaintenanceController(
            MaintenanceService maintenanceService) {

        this.maintenanceService =
                maintenanceService;
    }


    /*
     * =====================================================
     * VIEW SCHEDULES
     *
     * ALL ROLES
     * =====================================================
     */

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
    getUpcomingSchedules() {

        return ResponseEntity.ok(
                maintenanceService
                        .getUpcomingSchedules()
        );
    }


    /*
     * =====================================================
     * VIEW LOGS
     *
     * ALL ROLES
     * =====================================================
     */

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
    getAllLogs() {

        return ResponseEntity.ok(
                maintenanceService
                        .getAllLogs()
        );
    }


    /*
     * =====================================================
     * CREATE MAINTENANCE SCHEDULE
     *
     * ALL ROLES
     * =====================================================
     */

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

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        maintenanceService
                                .scheduleMaintenance(dto)
                );
    }


    /*
     * =====================================================
     * COMPLETE MAINTENANCE
     *
     * ADMIN + MANAGER + TECH
     *
     * SUPERVISOR = NO
     * =====================================================
     */

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


    /*
     * =====================================================
     * DELETE MAINTENANCE LOG
     *
     * ADMIN ONLY
     * =====================================================
     */

    @DeleteMapping("/logs/{id}")
    @PreAuthorize(
        "hasRole('SYSTEM_ADMIN')"
    )
    public ResponseEntity<String>
    deleteLog(
            @PathVariable Long id) {

        maintenanceService.deleteLog(
                id
        );

        return ResponseEntity.ok(
                "MaintenanceLog deleted successfully."
        );
    }
}