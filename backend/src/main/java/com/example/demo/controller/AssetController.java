
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
        public ResponseEntity<IndustrialAsset>
    createAsset(
            @RequestBody AssetRequestDto dto) {

        IndustrialAsset asset =
            assetService.createAsset(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
            .body(asset);
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
        public ResponseEntity<IndustrialAsset>
    updateAsset(
            @PathVariable Long id,
            @RequestBody AssetRequestDto dto) {

        IndustrialAsset asset =
            assetService.updateAsset(
                id,
                dto
            );

        return ResponseEntity.ok(asset);
    }

    @PatchMapping("/{id}/health")
    @PreAuthorize(
        "hasAnyRole(" +
        "'SYSTEM_ADMIN'," +
        "'ASSET_MANAGER'," +
        "'MAINTENANCE_TECHNICIAN'" +
        ")"
    )
    public ResponseEntity<IndustrialAsset>
    updateHealth(
            @PathVariable Long id,
            @RequestBody AssetRequestDto dto) {

        Integer health = dto == null
                ? null
                : dto.getCurrentHealth();

        if (health == null || health < 0 || health > 100) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(
                assetService.updateHealth(id, health)
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