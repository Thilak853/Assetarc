package com.example.demo.service;

import com.example.demo.dto.DashboardStatsDto;
import com.example.demo.entity.IndustrialAsset;
import com.example.demo.entity.IndustrialAsset.AssetStatus;
import com.example.demo.repository.IndustrialAssetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final IndustrialAssetRepository assetRepository;

    public DashboardService(IndustrialAssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getGlobalStats() {
        // 1. Total assets count
        long totalAssets = assetRepository.count();

        // 2. Active maintenance count
        long activeMaintenance = assetRepository.countByCurrentStatus(AssetStatus.UNDER_MAINTENANCE);

        // Fetch all assets once for remaining aggregations
        List<IndustrialAsset> allAssets = assetRepository.findAll();

        // 3. Sum purchasePrice for totalValue
        BigDecimal totalValue = allAssets.stream()
                .map(IndustrialAsset::getPurchasePrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Groups findAll() by status name for statusDistribution
        Map<String, Long> statusDistribution = allAssets.stream()
                .filter(asset -> asset.getCurrentStatus() != null)
                .collect(Collectors.groupingBy(
                        asset -> asset.getCurrentStatus().name(),
                        Collectors.counting()
                ));

        // 5. Hardcoded averageHealthScore = 85.5
        double averageHealthScore = 85.5;

        // Return populated DTO via standard constructor (without Lombok builder)
        return new DashboardStatsDto(
                totalAssets,
                activeMaintenance,
                averageHealthScore,
                totalValue,
                statusDistribution
        );
    }
}