

package com.example.demo.config;

import com.example.demo.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter
            jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    /*
     * =====================================================
     * PASSWORD ENCODER
     * =====================================================
     */

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    /*
     * =====================================================
     * AUTHENTICATION MANAGER
     * =====================================================
     */

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration
                .getAuthenticationManager();
    }


    /*
     * =====================================================
     * SECURITY FILTER CHAIN
     * =====================================================
     */

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {


        http

            .csrf(csrf ->
                    csrf.disable()
            )


            .cors(cors ->
                    cors.configurationSource(
                            corsConfigurationSource()
                    )
            )


            .exceptionHandling(ex -> ex
                    .authenticationEntryPoint((request, response, authException) -> {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.setContentType("application/json");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write("{\"message\":\"Your session has expired. Please log in again.\",\"status\":401}");
                    })
                    .accessDeniedHandler((request, response, accessDeniedException) -> {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.setContentType("application/json");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write("{\"message\":\"You do not have permission to perform this action.\",\"status\":403}");
                    })
            )


            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )


            .authorizeHttpRequests(auth -> auth


                    /*
                     * =========================================
                     * PUBLIC
                     * =========================================
                     */

                    .requestMatchers(
                            "/",
                            "/error",
                            "/hello"
                    ).permitAll()


                    /*
                     * LOGIN / REGISTER
                     */

                    .requestMatchers(
                            "/api/auth/**"
                    ).permitAll()


                    /*
                     * SWAGGER
                     */

                    .requestMatchers(
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**"
                    ).permitAll()


                    /*
                     * ACTUATOR
                     */

                    .requestMatchers(
                            "/actuator/health"
                    ).permitAll()


                    /*
                     * =========================================
                     * DASHBOARD
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/dashboard/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * ASSET VIEW
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.GET,
                            "/api/assets/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * ADD ASSET
                     *
                     * ADMIN + MANAGER
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.POST,
                            "/api/assets/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER"
                    )


                    .requestMatchers(
                            HttpMethod.PATCH,
                            "/api/assets/*/health"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN"
                    )


                    /*
                     * =========================================
                     * EDIT ASSET
                     *
                     * ADMIN + MANAGER
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.PUT,
                            "/api/assets/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER"
                    )


                    /*
                     * =========================================
                     * DECOMMISSION
                     *
                     * ADMIN + MANAGER
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.DELETE,
                            "/api/assets/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER"
                    )


                    /*
                     * =========================================
                     * MAINTENANCE SCHEDULE VIEW
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.GET,
                            "/api/maintenance/schedules"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * MAINTENANCE LOG VIEW
                     *
                     * ALL ROLES
                     */

                    .requestMatchers(
                            HttpMethod.GET,
                            "/api/maintenance/logs"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * CREATE MAINTENANCE SCHEDULE
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.POST,
                            "/api/maintenance/schedule"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * COMPLETE MAINTENANCE
                     *
                     * ADMIN + MANAGER + TECH
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.POST,
                            "/api/maintenance/complete"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN"
                    )


                    /*
                     * =========================================
                     * DELETE MAINTENANCE LOG
                     *
                     * ADMIN ONLY
                     * =========================================
                     */

                    .requestMatchers(
                            HttpMethod.DELETE,
                            "/api/maintenance/logs/**"
                    )
                    .hasRole(
                            "SYSTEM_ADMIN"
                    )


                    /*
                     * =========================================
                     * HEALTH MONITOR
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/health/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * MONITORING
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/monitoring/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * REPORTS
                     *
                     * ALL ROLES
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/reports/**"
                    )
                    .hasAnyRole(
                            "SYSTEM_ADMIN",
                            "ASSET_MANAGER",
                            "MAINTENANCE_TECHNICIAN",
                            "OPERATIONS_SUPERVISOR"
                    )


                    /*
                     * =========================================
                     * ADMIN ACCESS
                     *
                     * ADMIN ONLY
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/admin/**"
                    )
                    .hasRole(
                            "SYSTEM_ADMIN"
                    )


                    /*
                     * =========================================
                     * USER MANAGEMENT
                     *
                     * ADMIN ONLY
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/users/**"
                    )
                    .hasRole(
                            "SYSTEM_ADMIN"
                    )


                    /*
                     * =========================================
                     * OTHER API REQUESTS
                     *
                     * AUTHENTICATED USERS
                     * =========================================
                     */

                    .requestMatchers(
                            "/api/**"
                    )
                    .authenticated()


                    /*
                     * =========================================
                     * EVERYTHING ELSE
                     * =========================================
                     */

                    .anyRequest()
                    .authenticated()
            )


            /*
             * JWT FILTER
             */

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );


        return http.build();
    }


    /*
     * =====================================================
     * CORS
     * =====================================================
     */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        configuration.setAllowedOrigins(
                Arrays.asList(
                        "http://localhost:3000",
                        "http://localhost:3001",
                        "http://localhost:5173"
                )
        );

        configuration.setAllowCredentials(true);


        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        configuration.setAllowedHeaders(
                Arrays.asList(
                        "Authorization",
                        "Content-Type",
                        "Accept",
                        "Origin",
                        "X-Requested-With"
                )
        );


        configuration.setExposedHeaders(
                Arrays.asList(
                        "Authorization"
                )
        );


        configuration.setAllowCredentials(
                true
        );


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}