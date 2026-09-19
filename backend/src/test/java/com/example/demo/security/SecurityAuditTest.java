package com.example.demo.security;

import com.example.demo.controller.ConditionMonitoringController;
import com.example.demo.dto.HealthMetricDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class SecurityAuditTest {

    @Test
    public void jwtSecretShouldBeConfiguredFromApplicationProperties() throws Exception {
        Field secretField = JwtService.class.getDeclaredField("secretKey");
        Value valueAnnotation = secretField.getAnnotation(Value.class);

        Assert.assertNotNull(valueAnnotation,
                "JWT secret must be wired via @Value and not a hardcoded fallback");

        String annotationValue = valueAnnotation.value();
        Assert.assertFalse(
                annotationValue.contains("404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"),
                "JWT secret must not be hardcoded in source code"
        );
        Assert.assertTrue(
                annotationValue.contains("application.security.jwt.secret-key"),
                "JWT secret should come from application.properties"
        );
    }

    @Test
    public void monitoringEndpointMustRequireAuthorization() throws Exception {
        Method method = ConditionMonitoringController.class.getDeclaredMethod("recordMetric", HealthMetricDto.class);
        PreAuthorize preAuthorize = method.getAnnotation(PreAuthorize.class);

        Assert.assertNotNull(preAuthorize,
                "Monitoring endpoint must enforce RBAC with @PreAuthorize");

        String expression = preAuthorize.value();
        Assert.assertTrue(
                expression.contains("SYSTEM_ADMIN") || expression.contains("hasAnyRole"),
                "Monitoring endpoint must restrict access to authorized roles"
        );
    }
}
