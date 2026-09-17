
// // // package com.example.demo.security;

// // // import jakarta.servlet.FilterChain;
// // // import jakarta.servlet.ServletException;
// // // import jakarta.servlet.http.HttpServletRequest;
// // // import jakarta.servlet.http.HttpServletResponse;
// // // import org.springframework.lang.NonNull;
// // // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // // import org.springframework.security.core.context.SecurityContextHolder;
// // // import org.springframework.security.core.userdetails.UserDetails;
// // // import org.springframework.security.core.userdetails.UserDetailsService;
// // // import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// // // import org.springframework.stereotype.Component;
// // // import org.springframework.web.filter.OncePerRequestFilter;

// // // import java.io.IOException;

// // // @Component
// // // public class JwtAuthenticationFilter extends OncePerRequestFilter {

// // //     private final JwtService jwtService;
// // //     private final UserDetailsService userDetailsService;

// // //     public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
// // //         this.jwtService = jwtService;
// // //         this.userDetailsService = userDetailsService;
// // //     }

// // //     @Override
// // //     protected void doFilterInternal(
// // //             @NonNull HttpServletRequest request,
// // //             @NonNull HttpServletResponse response,
// // //             @NonNull FilterChain filterChain
// // //     ) throws ServletException, IOException {

// // //         final String authHeader = request.getHeader("Authorization");

       
// // //         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
// // //             filterChain.doFilter(request, response);
// // //             return;
// // //         }

// // //         try {
// // //             final String jwt = authHeader.substring(7);
// // //             final String username = jwtService.extractUsername(jwt);

// // //             if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
// // //                 UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

// // //                 if (jwtService.isTokenValid(jwt, userDetails)) {
// // //                     UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
// // //                             userDetails,
// // //                             null,
// // //                             userDetails.getAuthorities()
// // //                     );
// // //                     authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

// // //                     SecurityContextHolder.getContext().setAuthentication(authToken);
// // //                 }
// // //             }
// // //         } catch (Exception e) {
// // //             // Catch token parsing issues (expired, malformed, invalid signature)
// // //             // Logging can be added here if needed: logger.error("Cannot set user authentication: {}", e);
// // //         }

        
// // //         filterChain.doFilter(request, response);
// // //     }
// // // }
// // package com.example.demo.security;

// // import jakarta.servlet.FilterChain;
// // import jakarta.servlet.ServletException;
// // import jakarta.servlet.http.HttpServletRequest;
// // import jakarta.servlet.http.HttpServletResponse;

// // import org.springframework.lang.NonNull;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.core.context.SecurityContextHolder;
// // import org.springframework.security.core.userdetails.UserDetails;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// // import org.springframework.stereotype.Component;
// // import org.springframework.web.filter.OncePerRequestFilter;

// // import java.io.IOException;

// // @Component
// // public class JwtAuthenticationFilter extends OncePerRequestFilter {

// //     private final JwtService jwtService;
// //     private final UserDetailsService userDetailsService;

// //     public JwtAuthenticationFilter(
// //             JwtService jwtService,
// //             UserDetailsService userDetailsService) {

// //         this.jwtService = jwtService;
// //         this.userDetailsService = userDetailsService;
// //     }

// //     @Override
// //     protected void doFilterInternal(
// //             @NonNull HttpServletRequest request,
// //             @NonNull HttpServletResponse response,
// //             @NonNull FilterChain filterChain)
// //             throws ServletException, IOException {

// //         final String authHeader =
// //                 request.getHeader("Authorization");

// //         // -----------------------------------------
// //         // NO JWT TOKEN
// //         // -----------------------------------------

// //         if (authHeader == null ||
// //                 !authHeader.startsWith("Bearer ")) {

// //             filterChain.doFilter(request, response);
// //             return;
// //         }

// //         try {

// //             // -----------------------------------------
// //             // EXTRACT JWT
// //             // -----------------------------------------

// //             final String jwt =
// //                     authHeader.substring(7);

// //             final String username =
// //                     jwtService.extractUsername(jwt);

// //             // -----------------------------------------
// //             // LOAD USER
// //             // -----------------------------------------

// //             if (username != null &&
// //                     SecurityContextHolder
// //                             .getContext()
// //                             .getAuthentication() == null) {

// //                 UserDetails userDetails =
// //                         this.userDetailsService
// //                                 .loadUserByUsername(username);

// //                 // -----------------------------------------
// //                 // ROLE-BASED ACCESS VALIDATION
// //                 // -----------------------------------------

// //                 if (userDetails.getAuthorities() == null ||
// //                         userDetails.getAuthorities().isEmpty()) {

// //                     filterChain.doFilter(request, response);
// //                     return;
// //                 }

// //                 // -----------------------------------------
// //                 // VALIDATE JWT
// //                 // -----------------------------------------

// //                 if (jwtService.isTokenValid(
// //                         jwt,
// //                         userDetails)) {

// //                     // -----------------------------------------
// //                     // CREATE AUTHENTICATION
// //                     // -----------------------------------------

// //                     UsernamePasswordAuthenticationToken authToken =
// //                             new UsernamePasswordAuthenticationToken(
// //                                     userDetails,
// //                                     null,
// //                                     userDetails.getAuthorities()
// //                             );

// //                     // -----------------------------------------
// //                     // REQUEST DETAILS
// //                     // -----------------------------------------

// //                     authToken.setDetails(
// //                             new WebAuthenticationDetailsSource()
// //                                     .buildDetails(request)
// //                     );

// //                     // -----------------------------------------
// //                     // SET SECURITY CONTEXT
// //                     // -----------------------------------------

// //                     SecurityContextHolder
// //                             .getContext()
// //                             .setAuthentication(authToken);
// //                 }
// //             }

// //         } catch (Exception e) {

// //             // Invalid / expired / malformed JWT
// //             // Request continues without authentication.
// //             System.err.println(
// //                     "JWT authentication failed: "
// //                             + e.getMessage()
// //             );
// //         }

// //         // -----------------------------------------
// //         // CONTINUE FILTER CHAIN
// //         // -----------------------------------------

// //         filterChain.doFilter(request, response);
// //     }
// // }
// package com.example.demo.security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.lang.NonNull;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;

// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

// import org.springframework.stereotype.Component;

// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// @Component
// public class JwtAuthenticationFilter
//         extends OncePerRequestFilter {

//     private final JwtService jwtService;
//     private final UserDetailsService userDetailsService;

//     public JwtAuthenticationFilter(
//             JwtService jwtService,
//             UserDetailsService userDetailsService) {

//         this.jwtService = jwtService;
//         this.userDetailsService =
//                 userDetailsService;
//     }

//     @Override
//     protected void doFilterInternal(
//             @NonNull HttpServletRequest request,
//             @NonNull HttpServletResponse response,
//             @NonNull FilterChain filterChain)
//             throws ServletException, IOException {

//         final String authHeader =
//                 request.getHeader("Authorization");

//         if (authHeader == null ||
//                 !authHeader.startsWith("Bearer ")) {

//             filterChain.doFilter(
//                     request,
//                     response
//             );

//             return;
//         }

//         try {

//             final String jwt =
//                     authHeader.substring(7);

//             final String username =
//                     jwtService.extractUsername(jwt);

//             if (username != null &&
//                     SecurityContextHolder
//                             .getContext()
//                             .getAuthentication() == null) {

//                 UserDetails userDetails =
//                         userDetailsService
//                                 .loadUserByUsername(
//                                         username
//                                 );

//                 if (jwtService.isTokenValid(
//                         jwt,
//                         userDetails)) {

//                     UsernamePasswordAuthenticationToken
//                             authToken =
//                             new UsernamePasswordAuthenticationToken(
//                                     userDetails,
//                                     null,
//                                     userDetails
//                                             .getAuthorities()
//                             );

//                     authToken.setDetails(
//                             new WebAuthenticationDetailsSource()
//                                     .buildDetails(request)
//                     );

//                     SecurityContextHolder
//                             .getContext()
//                             .setAuthentication(
//                                     authToken
//                             );
//                 }
//             }

//         } catch (Exception e) {

//             System.err.println(
//                     "JWT authentication failed: "
//                             + e.getMessage()
//             );
//         }

//         filterChain.doFilter(
//                 request,
//                 response
//         );
//     }
// }
package com.example.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService) {

        this.jwtService =
                jwtService;

        this.userDetailsService =
                userDetailsService;
    }


    @Override
    protected void doFilterInternal(

            @NonNull HttpServletRequest request,

            @NonNull HttpServletResponse response,

            @NonNull FilterChain filterChain)

            throws ServletException, IOException {


        final String authHeader =
                request.getHeader(
                        "Authorization"
                );


        if (
                authHeader == null ||
                !authHeader.startsWith(
                        "Bearer "
                )
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        try {

            final String jwt =
                    authHeader.substring(7);


            final String username =
                    jwtService.extractUsername(
                            jwt
                    );


            if (
                    username != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication()
                            == null
            ) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(
                                        username
                                );


                if (
                        userDetails
                                .getAuthorities()
                                .isEmpty()
                ) {

                    filterChain.doFilter(
                            request,
                            response
                    );

                    return;
                }


                if (
                        jwtService.isTokenValid(
                                jwt,
                                userDetails
                        )
                ) {

                    UsernamePasswordAuthenticationToken
                            authToken =
                            new UsernamePasswordAuthenticationToken(

                                    userDetails,

                                    null,

                                    userDetails
                                            .getAuthorities()
                            );


                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(
                                            request
                                    )
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authToken
                            );
                }
            }

        } catch (Exception e) {

            System.err.println(
                    "JWT authentication failed: "
                            + e.getMessage()
            );
        }


        filterChain.doFilter(
                request,
                response
        );
    }
}