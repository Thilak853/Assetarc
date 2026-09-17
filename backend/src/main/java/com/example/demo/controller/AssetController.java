// // // package com.example.demo.controller;

// // // import com.example.demo.dto.AssetRequestDto;
// // // import com.example.demo.entity.IndustrialAsset;
// // // import com.example.demo.service.AssetService;
// // // import org.springframework.http.HttpStatus;
// // // import org.springframework.http.ResponseEntity;
// // // import org.springframework.security.access.prepost.PreAuthorize;
// // // import org.springframework.web.bind.annotation.*;

// // // import java.util.List;

// // // @RestController
// // // @RequestMapping("/api/assets")
// // // @CrossOrigin
// // // public class AssetController {

// // //     private final AssetService assetService;

// // //     public AssetController(AssetService assetService) {
// // //         this.assetService = assetService;
// // //     }

// // //     @GetMapping
// // //     public ResponseEntity<List<IndustrialAsset>> getAllAssets() {
// // //         return ResponseEntity.ok(assetService.getAllAssets());
// // //     }

// // //     @GetMapping("/{id}")
// // //     public ResponseEntity<IndustrialAsset> getAssetById(@PathVariable Long id) {
// // //         return ResponseEntity.ok(assetService.getAssetById(id));
// // //     }

// // //     // t9: Expects ResponseEntity<String> with body "Asset created successfully."
// // //     @PostMapping
// // //     @PreAuthorize("hasRole('ADMIN')")
// // //     public ResponseEntity<String> createAsset(@RequestBody AssetRequestDto dto) {
// // //         assetService.createAsset(dto);
// // //         return ResponseEntity.status(HttpStatus.CREATED).body("Asset created successfully.");
// // //     }

// // //     // t10: Expects ResponseEntity<String> with body "Asset updated successfully."
// // //     @PutMapping("/{id}")
// // //     @PreAuthorize("hasRole('ADMIN')")
// // //     public ResponseEntity<String> updateAsset(@PathVariable Long id, @RequestBody AssetRequestDto dto) {
// // //         assetService.updateAsset(id, dto);
// // //         return ResponseEntity.ok("Asset updated successfully.");
// // //     }

// // //     // t8: Expects ResponseEntity<String> with body "Asset deleted successfully."
// // //     @DeleteMapping("/{id}")
// // //     @PreAuthorize("hasRole('ADMIN')")
// // //     public ResponseEntity<String> decommissionAsset(@PathVariable Long id) {
// // //         assetService.decommissionAsset(id);
// // //         return ResponseEntity.ok("Asset deleted successfully.");
// // //     }
// // // }
// // package com.example.demo.controller;

// // import com.example.demo.dto.AssetRequestDto;
// // import com.example.demo.entity.IndustrialAsset;
// // import com.example.demo.service.AssetService;
// // import org.springframework.http.HttpStatus;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.security.access.prepost.PreAuthorize;
// // import org.springframework.web.bind.annotation.*;

// // import java.util.List;

// // @RestController
// // @RequestMapping("/api/assets")
// // @CrossOrigin
// // public class AssetController {

// //     private final AssetService assetService;

// //     public AssetController(AssetService assetService) {
// //         this.assetService = assetService;
// //     }

// //     @GetMapping
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER',
// //             'MAINTENANCE_TECHNICIAN',
// //             'OPERATIONS_SUPERVISOR'
// //         )
// //     """)
// //     public ResponseEntity<List<IndustrialAsset>> getAllAssets() {
// //         return ResponseEntity.ok(assetService.getAllAssets());
// //     }

// //     @GetMapping("/{id}")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER',
// //             'MAINTENANCE_TECHNICIAN',
// //             'OPERATIONS_SUPERVISOR'
// //         )
// //     """)
// //     public ResponseEntity<IndustrialAsset> getAssetById(
// //             @PathVariable Long id) {

// //         return ResponseEntity.ok(
// //                 assetService.getAssetById(id)
// //         );
// //     }

// //     // t9: Expects ResponseEntity<String>
// //     // with body "Asset created successfully."
// //     //
// //     // SYSTEM_ADMIN + ASSET_MANAGER
// //     @PostMapping
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER'
// //         )
// //     """)
// //     public ResponseEntity<String> createAsset(
// //             @RequestBody AssetRequestDto dto) {

// //         assetService.createAsset(dto);

// //         return ResponseEntity
// //                 .status(HttpStatus.CREATED)
// //                 .body("Asset created successfully.");
// //     }

// //     // t10: Expects ResponseEntity<String>
// //     // with body "Asset updated successfully."
// //     //
// //     // SYSTEM_ADMIN + ASSET_MANAGER
// //     @PutMapping("/{id}")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER'
// //         )
// //     """)
// //     public ResponseEntity<String> updateAsset(
// //             @PathVariable Long id,
// //             @RequestBody AssetRequestDto dto) {

// //         assetService.updateAsset(id, dto);

// //         return ResponseEntity.ok(
// //                 "Asset updated successfully."
// //         );
// //     }

// //     // t8: Expects ResponseEntity<String>
// //     // with body "Asset deleted successfully."
// //     //
// //     // SYSTEM_ADMIN + ASSET_MANAGER
// //     @DeleteMapping("/{id}")
// //     @PreAuthorize("""
// //         hasAnyRole(
// //             'SYSTEM_ADMIN',
// //             'ASSET_MANAGER'
// //         )
// //     """)
// //     public ResponseEntity<String> decommissionAsset(
// //             @PathVariable Long id) {

// //         assetService.decommissionAsset(id);

// //         return ResponseEntity.ok(
// //                 "Asset deleted successfully."
// //         );
// //     }
// // }
// package com.example.demo.controller;

// import com.example.demo.dto.AssetRequestDto;
// import com.example.demo.entity.IndustrialAsset;
// import com.example.demo.service.AssetService;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;

// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/assets")
// @CrossOrigin
// public class AssetController {

//     private final AssetService assetService;

//     public AssetController(
//             AssetService assetService) {

//         this.assetService = assetService;
//     }

//     @GetMapping
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER',
//             'MAINTENANCE_TECHNICIAN',
//             'OPERATIONS_SUPERVISOR'
//         )
//     """)
//     public ResponseEntity<List<IndustrialAsset>> getAllAssets() {

//         return ResponseEntity.ok(
//                 assetService.getAllAssets()
//         );
//     }

//     @GetMapping("/{id}")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER',
//             'MAINTENANCE_TECHNICIAN',
//             'OPERATIONS_SUPERVISOR'
//         )
//     """)
//     public ResponseEntity<IndustrialAsset> getAssetById(
//             @PathVariable Long id) {

//         return ResponseEntity.ok(
//                 assetService.getAssetById(id)
//         );
//     }

//     @PostMapping
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER'
//         )
//     """)
//     public ResponseEntity<String> createAsset(
//             @RequestBody AssetRequestDto dto) {

//         assetService.createAsset(dto);

//         return ResponseEntity
//                 .status(HttpStatus.CREATED)
//                 .body(
//                         "Asset created successfully."
//                 );
//     }

//     @PutMapping("/{id}")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER'
//         )
//     """)
//     public ResponseEntity<String> updateAsset(
//             @PathVariable Long id,
//             @RequestBody AssetRequestDto dto) {

//         assetService.updateAsset(id, dto);

//         return ResponseEntity.ok(
//                 "Asset updated successfully."
//         );
//     }

//     @DeleteMapping("/{id}")
//     @PreAuthorize("""
//         hasAnyRole(
//             'SYSTEM_ADMIN',
//             'ASSET_MANAGER'
//         )
//     """)
//     public ResponseEntity<String> decommissionAsset(
//             @PathVariable Long id) {

//         assetService.decommissionAsset(id);

//         return ResponseEntity.ok(
//                 "Asset deleted successfully."
//         );
//     }
// }
package com.example.demo.controller;

import com.example.demo.dto.AssetRequestDto;
import com.example.demo.entity.IndustrialAsset;
import com.example.demo.service.AssetService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin
public class AssetController {

    private final AssetService assetService;


    public AssetController(
            AssetService assetService) {

        this.assetService =
                assetService;
    }


    /*
     * =====================================================
     * VIEW ALL
     *
     * ADMIN
     * MANAGER
     * TECH
     * SUPERVISOR
     * =====================================================
     */

    @GetMapping
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'," +
        "'MAINTENANCE_TECHNICIAN'," +
        "'OPERATIONS_SUPERVISOR'" +
        ")"
    )
    public ResponseEntity<List<IndustrialAsset>>
    getAllAssets() {

        return ResponseEntity.ok(
                assetService.getAllAssets()
        );
    }


    /*
     * =====================================================
     * VIEW ONE
     *
     * ALL ROLES
     * =====================================================
     */

    @GetMapping("/{id}")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'," +
        "'MAINTENANCE_TECHNICIAN'," +
        "'OPERATIONS_SUPERVISOR'" +
        ")"
    )
    public ResponseEntity<IndustrialAsset>
    getAssetById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                assetService.getAssetById(id)
        );
    }


    /*
     * =====================================================
     * ADD
     *
     * ADMIN + MANAGER
     * =====================================================
     */

    @PostMapping
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'" +
        ")"
    )
    public ResponseEntity<String>
    createAsset(
            @RequestBody AssetRequestDto dto) {

        assetService.createAsset(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        "Asset created successfully."
                );
    }


    /*
     * =====================================================
     * EDIT
     *
     * ADMIN + MANAGER
     * =====================================================
     */

    @PutMapping("/{id}")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'" +
        ")"
    )
    public ResponseEntity<String>
    updateAsset(
            @PathVariable Long id,
            @RequestBody AssetRequestDto dto) {

        assetService.updateAsset(
                id,
                dto
        );

        return ResponseEntity.ok(
                "Asset updated successfully."
        );
    }


    /*
     * =====================================================
     * DECOMMISSION
     *
     * ADMIN + MANAGER
     * =====================================================
     */

    @DeleteMapping("/{id}")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'" +
        ")"
    )
    public ResponseEntity<String>
    decommissionAsset(
            @PathVariable Long id) {

        assetService.decommissionAsset(
                id
        );

        return ResponseEntity.ok(
                "Asset deleted successfully."
        );
    }
}