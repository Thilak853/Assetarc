
// // // // package com.example.demo.config;

// // // // import com.example.demo.security.JwtAuthenticationFilter;
// // // // import org.springframework.context.annotation.Bean;
// // // // import org.springframework.context.annotation.Configuration;
// // // // import org.springframework.security.authentication.AuthenticationProvider;
// // // // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // // // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // // // import org.springframework.security.config.http.SessionCreationPolicy;
// // // // import org.springframework.security.web.SecurityFilterChain;
// // // // import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// // // // import org.springframework.web.cors.CorsConfiguration;
// // // // import org.springframework.web.cors.CorsConfigurationSource;
// // // // import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// // // // import java.util.List;

// // // // @Configuration
// // // // @EnableWebSecurity
// // // // public class SecurityConfig {

// // // //     private final JwtAuthenticationFilter jwtAuthFilter;
// // // //     private final AuthenticationProvider authenticationProvider;

// // // //     public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
// // // //         this.jwtAuthFilter = jwtAuthFilter;
// // // //         this.authenticationProvider = authenticationProvider;
// // // //     }

// // // //     @Bean
// // // //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// // // //         http
// // // //             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
// // // //             .csrf(csrf -> csrf.disable())
// // // //             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
// // // //             .authorizeHttpRequests(auth -> auth
// // // //                 // Public Endpoints & Swagger
// // // //                 .requestMatchers(
// // // //                     "/post",
// // // //                     "/auth/login",
// // // //                     "/api/auth/**",
// // // //                     "/api/maintenance/**",  // <-- Fixed: Allows maintenance requests in Swagger
// // // //                     "/api/health/**",
// // // //                     "/swagger-ui/**",
// // // //                     "/swagger-ui.html",
// // // //                     "/v3/api-docs",
// // // //                     "/v3/api-docs/**",
// // // //                     "/swagger-resources/**",
// // // //                     "/webjars/**"
// // // //                 ).permitAll()
                
// // // //                 // Role-based Endpoints
// // // //                 .requestMatchers("/delete/**").hasRole("ADMIN")
                
// // // //                 // All other endpoints require authentication
// // // //                 .anyRequest().authenticated()
// // // //             )
// // // //             .authenticationProvider(authenticationProvider)
// // // //             .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

// // // //         return http.build();
// // // //     }

// // // //     @Bean
// // // //     public CorsConfigurationSource corsConfigurationSource() {
// // // //         CorsConfiguration configuration = new CorsConfiguration();
// // // //         configuration.setAllowedOriginPatterns(List.of("*"));
// // // //         configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
// // // //         configuration.setAllowedHeaders(List.of("*"));
// // // //         configuration.setAllowCredentials(true);
        
// // // //         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// // // //         source.registerCorsConfiguration("/**", configuration);
// // // //         return source;
// // // //     }
// // // // }
// // // package com.example.demo.config;

// // // import org.springframework.context.annotation.Bean;
// // // import org.springframework.context.annotation.Configuration;
// // // import org.springframework.http.HttpMethod;
// // // import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// // // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // // import org.springframework.security.config.http.SessionCreationPolicy;
// // // import org.springframework.security.web.SecurityFilterChain;

// // // @Configuration
// // // @EnableMethodSecurity
// // // public class SecurityConfig {

// // //     @Bean
// // //     public SecurityFilterChain securityFilterChain(
// // //             HttpSecurity http) throws Exception {

// // //         http
// // //             .csrf(csrf -> csrf.disable())

// // //             .cors(cors -> {})

// // //             .sessionManagement(session ->
// // //                     session.sessionCreationPolicy(
// // //                             SessionCreationPolicy.STATELESS
// // //                     )
// // //             )

// // //             .authorizeHttpRequests(auth -> auth

// // //                     // Public endpoints
// // //                     .requestMatchers(
// // //                             "/",
// // //                             "/error",
// // //                             "/hello",
// // //                             "/api/auth/**",
// // //                             "/api/health",
// // //                             "/actuator/health",
// // //                             "/swagger-ui/**",
// // //                             "/swagger-ui.html",
// // //                             "/v3/api-docs/**"
// // //                     ).permitAll()

// // //                     // Asset APIs
// // //                     .requestMatchers(HttpMethod.GET,
// // //                             "/api/assets/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "ASSET_MANAGER",
// // //                             "MAINTENANCE_TECHNICIAN",
// // //                             "OPERATIONS_SUPERVISOR"
// // //                     )

// // //                     .requestMatchers(HttpMethod.POST,
// // //                             "/api/assets/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "ASSET_MANAGER"
// // //                     )

// // //                     .requestMatchers(HttpMethod.PUT,
// // //                             "/api/assets/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "ASSET_MANAGER"
// // //                     )

// // //                     .requestMatchers(HttpMethod.DELETE,
// // //                             "/api/assets/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "ASSET_MANAGER"
// // //                     )

// // //                     // Maintenance
// // //                     .requestMatchers("/api/maintenance/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "MAINTENANCE_TECHNICIAN"
// // //                     )

// // //                     // Health monitoring
// // //                     .requestMatchers("/api/monitoring/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "MAINTENANCE_TECHNICIAN",
// // //                             "OPERATIONS_SUPERVISOR"
// // //                     )

// // //                     // Dashboard
// // //                     .requestMatchers("/api/dashboard/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "ASSET_MANAGER",
// // //                             "MAINTENANCE_TECHNICIAN",
// // //                             "OPERATIONS_SUPERVISOR"
// // //                     )

// // //                     // Reports
// // //                     .requestMatchers("/api/reports/**")
// // //                     .hasAnyRole(
// // //                             "SYSTEM_ADMIN",
// // //                             "OPERATIONS_SUPERVISOR"
// // //                     )

// // //                     // Admin
// // //                     .requestMatchers("/api/admin/**")
// // //                     .hasRole("SYSTEM_ADMIN")

// // //                     // Everything else
// // //                     .anyRequest().authenticated()
// // //             );

// // //         return http.build();
// // //     }
// // // }
// // package com.example.demo.config;

// // import com.example.demo.security.JwtAuthenticationFilter;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.authentication.AuthenticationManager;
// // import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// // import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.http.SessionCreationPolicy;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.SecurityFilterChain;
// // import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// // import org.springframework.web.cors.CorsConfiguration;
// // import org.springframework.web.cors.CorsConfigurationSource;
// // import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// // import java.util.Arrays;

// // @Configuration
// // @EnableMethodSecurity
// // public class SecurityConfig {

// //     private final JwtAuthenticationFilter jwtAuthenticationFilter;

// //     public SecurityConfig(
// //             JwtAuthenticationFilter jwtAuthenticationFilter) {
// //         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public AuthenticationManager authenticationManager(
// //             AuthenticationConfiguration configuration)
// //             throws Exception {

// //         return configuration.getAuthenticationManager();
// //     }

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(
// //             HttpSecurity http) throws Exception {

// //         http
// //             // Disable CSRF because this is a REST API
// //             .csrf(csrf -> csrf.disable())

// //             // Enable CORS
// //             .cors(cors -> cors.configurationSource(
// //                     corsConfigurationSource()
// //             ))

// //             // JWT based authentication - no sessions
// //             .sessionManagement(session ->
// //                     session.sessionCreationPolicy(
// //                             SessionCreationPolicy.STATELESS
// //                     )
// //             )

// //             .authorizeHttpRequests(auth -> auth

// //                     // --------------------------------
// //                     // PUBLIC ENDPOINTS
// //                     // --------------------------------

// //                     .requestMatchers(
// //                             "/",
// //                             "/error",
// //                             "/hello"
// //                     ).permitAll()

// //                     // Authentication
// //                     .requestMatchers(
// //                             "/api/auth/**"
// //                     ).permitAll()

// //                     // Swagger
// //                     .requestMatchers(
// //                             "/swagger-ui/**",
// //                             "/swagger-ui.html",
// //                             "/v3/api-docs/**"
// //                     ).permitAll()

// //                     // Health check
// //                     .requestMatchers(
// //                             "/actuator/health"
// //                     ).permitAll()

// //                     // --------------------------------
// //                     // ASSET ENDPOINTS
// //                     // --------------------------------

// //                     // Everyone can view assets
// //                     .requestMatchers(
// //                             "GET",
// //                             "/api/assets/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER",
// //                             "MAINTENANCE_TECHNICIAN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // Admin + Asset Manager can create
// //                     .requestMatchers(
// //                             "POST",
// //                             "/api/assets/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER"
// //                     )

// //                     // Admin + Asset Manager can update
// //                     .requestMatchers(
// //                             "PUT",
// //                             "/api/assets/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER"
// //                     )

// //                     // Admin + Asset Manager can delete/decommission
// //                     .requestMatchers(
// //                             "DELETE",
// //                             "/api/assets/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER"
// //                     )

// //                     // --------------------------------
// //                     // MAINTENANCE ENDPOINTS
// //                     // --------------------------------

// //                     // All roles can view schedules
// //                     .requestMatchers(
// //                             "GET",
// //                             "/api/maintenance/schedules"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER",
// //                             "MAINTENANCE_TECHNICIAN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // All roles can view logs
// //                     .requestMatchers(
// //                             "GET",
// //                             "/api/maintenance/logs"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER",
// //                             "MAINTENANCE_TECHNICIAN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // Admin + Manager can schedule
// //                     .requestMatchers(
// //                             "POST",
// //                             "/api/maintenance/schedule"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER"
// //                     )

// //                     // Admin + Technician can complete
// //                     .requestMatchers(
// //                             "POST",
// //                             "/api/maintenance/complete"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "MAINTENANCE_TECHNICIAN"
// //                     )

// //                     // Admin can delete logs
// //                     .requestMatchers(
// //                             "DELETE",
// //                             "/api/maintenance/logs/**"
// //                     ).hasRole(
// //                             "SYSTEM_ADMIN"
// //                     )

// //                     // --------------------------------
// //                     // HEALTH / MONITORING
// //                     // --------------------------------

// //                     .requestMatchers(
// //                             "/api/health/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "MAINTENANCE_TECHNICIAN"
// //                     )

// //                     .requestMatchers(
// //                             "/api/monitoring/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "MAINTENANCE_TECHNICIAN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // --------------------------------
// //                     // DASHBOARD
// //                     // --------------------------------

// //                     .requestMatchers(
// //                             "/api/dashboard/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "ASSET_MANAGER",
// //                             "MAINTENANCE_TECHNICIAN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // --------------------------------
// //                     // REPORTS
// //                     // --------------------------------

// //                     .requestMatchers(
// //                             "/api/reports/**"
// //                     ).hasAnyRole(
// //                             "SYSTEM_ADMIN",
// //                             "OPERATIONS_SUPERVISOR"
// //                     )

// //                     // --------------------------------
// //                     // ADMIN
// //                     // --------------------------------

// //                     .requestMatchers(
// //                             "/api/admin/**"
// //                     ).hasRole(
// //                             "SYSTEM_ADMIN"
// //                     )

// //                     // Everything else requires login
// //                     .anyRequest().authenticated()
// //             )

// //             // JWT filter
// //             .addFilterBefore(
// //                     jwtAuthenticationFilter,
// //                     UsernamePasswordAuthenticationFilter.class
// //             );

// //         return http.build();
// //     }

// //     // --------------------------------
// //     // CORS CONFIGURATION
// //     // --------------------------------

// //     @Bean
// //     public CorsConfigurationSource corsConfigurationSource() {

// //         CorsConfiguration configuration =
// //                 new CorsConfiguration();

// //         configuration.setAllowedOrigins(
// //                 Arrays.asList(
// //                         "http://localhost:3000",
// //                         "http://localhost:3001",
// //                         "http://localhost:5173"
// //                 )
// //         );

// //         configuration.setAllowedMethods(
// //                 Arrays.asList(
// //                         "GET",
// //                         "POST",
// //                         "PUT",
// //                         "DELETE",
// //                         "PATCH",
// //                         "OPTIONS"
// //                 )
// //         );

// //         configuration.setAllowedHeaders(
// //                 Arrays.asList(
// //                         "Authorization",
// //                         "Content-Type",
// //                         "Accept",
// //                         "Origin",
// //                         "X-Requested-With"
// //                 )
// //         );

// //         configuration.setExposedHeaders(
// //                 Arrays.asList(
// //                         "Authorization"
// //                 )
// //         );

// //         configuration.setAllowCredentials(true);

// //         UrlBasedCorsConfigurationSource source =
// //                 new UrlBasedCorsConfigurationSource();

// //         source.registerCorsConfiguration(
// //                 "/**",
// //                 configuration
// //         );

// //         return source;
// //     }
// // }
// package com.example.demo.config;

// import com.example.demo.security.JwtAuthenticationFilter;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.http.HttpMethod;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;

// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.Arrays;

// @Configuration
// @EnableMethodSecurity
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(
//             JwtAuthenticationFilter jwtAuthenticationFilter) {

//         this.jwtAuthenticationFilter =
//                 jwtAuthenticationFilter;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {

//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration configuration)
//             throws Exception {

//         return configuration.getAuthenticationManager();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(
//             HttpSecurity http)
//             throws Exception {

//         http
//                 .csrf(csrf ->
//                         csrf.disable()
//                 )

//                 .cors(cors ->
//                         cors.configurationSource(
//                                 corsConfigurationSource()
//                         )
//                 )

//                 .sessionManagement(session ->
//                         session.sessionCreationPolicy(
//                                 SessionCreationPolicy.STATELESS
//                         )
//                 )

//                 .authorizeHttpRequests(auth -> auth

//                         // -----------------------------
//                         // PUBLIC
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/",
//                                 "/error",
//                                 "/hello"
//                         ).permitAll()

//                         .requestMatchers(
//                                 "/api/auth/**"
//                         ).permitAll()

//                         .requestMatchers(
//                                 "/swagger-ui/**",
//                                 "/swagger-ui.html",
//                                 "/v3/api-docs/**"
//                         ).permitAll()

//                         .requestMatchers(
//                                 "/actuator/health"
//                         ).permitAll()


//                         // -----------------------------
//                         // ASSETS - VIEW
//                         // ALL ROLES
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.GET,
//                                 "/api/assets/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER",
//                                 "MAINTENANCE_TECHNICIAN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // ASSETS - CREATE
//                         // ADMIN + MANAGER
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.POST,
//                                 "/api/assets/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER"
//                         )


//                         // -----------------------------
//                         // ASSETS - UPDATE
//                         // ADMIN + MANAGER
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.PUT,
//                                 "/api/assets/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER"
//                         )


//                         // -----------------------------
//                         // ASSETS - DECOMMISSION
//                         // ADMIN + MANAGER
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.DELETE,
//                                 "/api/assets/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER"
//                         )


//                         // -----------------------------
//                         // MAINTENANCE - VIEW SCHEDULES
//                         // ALL ROLES
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.GET,
//                                 "/api/maintenance/schedules"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER",
//                                 "MAINTENANCE_TECHNICIAN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // MAINTENANCE - VIEW LOGS
//                         // ALL ROLES
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.GET,
//                                 "/api/maintenance/logs"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER",
//                                 "MAINTENANCE_TECHNICIAN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // MAINTENANCE - SCHEDULE
//                         // ADMIN + MANAGER
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.POST,
//                                 "/api/maintenance/schedule"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER"
//                         )


//                         // -----------------------------
//                         // MAINTENANCE - COMPLETE
//                         // ADMIN + TECHNICIAN
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.POST,
//                                 "/api/maintenance/complete"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "MAINTENANCE_TECHNICIAN"
//                         )


//                         // -----------------------------
//                         // DELETE MAINTENANCE LOG
//                         // ADMIN ONLY
//                         // -----------------------------

//                         .requestMatchers(
//                                 HttpMethod.DELETE,
//                                 "/api/maintenance/logs/**"
//                         )
//                         .hasRole(
//                                 "SYSTEM_ADMIN"
//                         )


//                         // -----------------------------
//                         // HEALTH
//                         // ADMIN + TECHNICIAN
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/health/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "MAINTENANCE_TECHNICIAN"
//                         )


//                         // -----------------------------
//                         // MONITORING
//                         // ADMIN + TECH + SUPERVISOR
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/monitoring/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "MAINTENANCE_TECHNICIAN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // DASHBOARD
//                         // ALL ROLES
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/dashboard/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "ASSET_MANAGER",
//                                 "MAINTENANCE_TECHNICIAN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // REPORTS
//                         // ADMIN + SUPERVISOR
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/reports/**"
//                         )
//                         .hasAnyRole(
//                                 "SYSTEM_ADMIN",
//                                 "OPERATIONS_SUPERVISOR"
//                         )


//                         // -----------------------------
//                         // ADMIN
//                         // SYSTEM ADMIN ONLY
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/admin/**"
//                         )
//                         .hasRole(
//                                 "SYSTEM_ADMIN"
//                         )


//                         // -----------------------------
//                         // OTHER API
//                         // AUTHENTICATED
//                         // -----------------------------

//                         .requestMatchers(
//                                 "/api/**"
//                         )
//                         .authenticated()


//                         // -----------------------------
//                         // EVERYTHING ELSE
//                         // -----------------------------

//                         .anyRequest()
//                         .authenticated()
//                 )

//                 .addFilterBefore(
//                         jwtAuthenticationFilter,
//                         UsernamePasswordAuthenticationFilter.class
//                 );

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {

//         CorsConfiguration configuration =
//                 new CorsConfiguration();

//         configuration.setAllowedOrigins(
//                 Arrays.asList(
//                         "http://localhost:3000",
//                         "http://localhost:3001",
//                         "http://localhost:5173"
//                 )
//         );

//         configuration.setAllowedMethods(
//                 Arrays.asList(
//                         "GET",
//                         "POST",
//                         "PUT",
//                         "DELETE",
//                         "PATCH",
//                         "OPTIONS"
//                 )
//         );

//         configuration.setAllowedHeaders(
//                 Arrays.asList(
//                         "Authorization",
//                         "Content-Type",
//                         "Accept",
//                         "Origin",
//                         "X-Requested-With"
//                 )
//         );

//         configuration.setExposedHeaders(
//                 Arrays.asList(
//                         "Authorization"
//                 )
//         );

//         configuration.setAllowCredentials(true);

//         UrlBasedCorsConfigurationSource source =
//                 new UrlBasedCorsConfigurationSource();

//         source.registerCorsConfiguration(
//                 "/**",
//                 configuration
//         );

//         return source;
//     }
// }
package com.example.demo.config;

import com.example.demo.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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