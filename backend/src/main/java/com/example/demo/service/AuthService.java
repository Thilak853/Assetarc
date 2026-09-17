// // package com.example.demo.service;

// // import com.example.demo.dto.AuthRequestDto;
// // import com.example.demo.dto.AuthResponseDto;
// // import com.example.demo.entity.SystemUser;
// // import com.example.demo.repository.SystemUserRepository;
// // import com.example.demo.security.JwtService;

// // import org.springframework.security.authentication.AuthenticationManager;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.stereotype.Service;

// // @Service
// // public class AuthService {

// //     private final SystemUserRepository systemUserRepository;
// //     private final PasswordEncoder passwordEncoder;
// //     private final JwtService jwtService;
// //     private final AuthenticationManager authenticationManager;

// //     public AuthService(SystemUserRepository systemUserRepository,
// //                        PasswordEncoder passwordEncoder,
// //                        JwtService jwtService,
// //                        AuthenticationManager authenticationManager) {
// //         this.systemUserRepository = systemUserRepository;
// //         this.passwordEncoder = passwordEncoder;
// //         this.jwtService = jwtService;
// //         this.authenticationManager = authenticationManager;
// //     }

// //     public AuthResponseDto register(SystemUser request) {
// //         // 1. Hash the raw password using BCryptPasswordEncoder bean defined in SecurityConfig
// //         request.setPassword(passwordEncoder.encode(request.getPassword()));

// //         // 2. Save user to DB
// //         SystemUser savedUser = systemUserRepository.save(request);

// //         // 3. Generate token using JwtService's generateToken(SystemUser systemUser)
// //         String token = jwtService.generateToken(savedUser);

// //         // 4. Return token & user info in response DTO
// //         return new AuthResponseDto(
// //                 token,
// //                 savedUser.getId(),
// //                 savedUser.getUsername(),
// //                 savedUser.getRole() != null ? savedUser.getRole().name() : null
// //         );
// //     }

// //     public AuthResponseDto authenticate(AuthRequestDto request) {
// //         // 1. Hand credentials to AuthenticationManager (from SecurityConfig).
// //         //    Under the hood, it uses your UserDetailsService and BCryptPasswordEncoder 
// //         //    to verify if the password matches the DB hash.
// //         authenticationManager.authenticate(
// //                 new UsernamePasswordAuthenticationToken(
// //                         request.getUsername(),
// //                         request.getPassword()
// //                 )
// //         );

// //         // 2. Fetch user from DB after successful authentication
// //         SystemUser user = systemUserRepository.findByUsername(request.getUsername())
// //                 .orElseThrow(() -> new RuntimeException("User not found"));

// //         // 3. Generate token using JwtService
// //         String token = jwtService.generateToken(user);

// //         // 4. Return response
// //         return new AuthResponseDto(
// //                 token,
// //                 user.getId(),
// //                 user.getUsername(),
// //                 user.getRole() != null ? user.getRole().name() : null
// //         );
// //     }
// // }
// package com.example.demo.service;

// import com.example.demo.dto.AuthRequestDto;
// import com.example.demo.dto.AuthResponseDto;
// import com.example.demo.entity.SystemUser;
// import com.example.demo.repository.SystemUserRepository;
// import com.example.demo.security.JwtService;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {

//     private final SystemUserRepository systemUserRepository;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtService jwtService;
//     private final AuthenticationManager authenticationManager;

//     public AuthService(
//             SystemUserRepository systemUserRepository,
//             PasswordEncoder passwordEncoder,
//             JwtService jwtService,
//             AuthenticationManager authenticationManager) {

//         this.systemUserRepository = systemUserRepository;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtService = jwtService;
//         this.authenticationManager = authenticationManager;
//     }

//     public AuthResponseDto register(SystemUser request) {

//         if (request.getUsername() == null ||
//                 request.getUsername().trim().isEmpty()) {

//             throw new RuntimeException(
//                     "Username is required"
//             );
//         }

//         if (request.getPassword() == null ||
//                 request.getPassword().trim().isEmpty()) {

//             throw new RuntimeException(
//                     "Password is required"
//             );
//         }

//         if (request.getRole() == null) {

//             throw new RuntimeException(
//                     "Role is required"
//             );
//         }

//         if (systemUserRepository
//                 .existsByUsername(request.getUsername())) {

//             throw new RuntimeException(
//                     "Username already exists"
//             );
//         }

//         request.setPassword(
//                 passwordEncoder.encode(
//                         request.getPassword()
//                 )
//         );

//         SystemUser savedUser =
//                 systemUserRepository.save(request);

//         String token =
//                 jwtService.generateToken(savedUser);

//         return new AuthResponseDto(
//                 token,
//                 savedUser.getId(),
//                 savedUser.getUsername(),
//                 savedUser.getRole().name()
//         );
//     }

//     public AuthResponseDto authenticate(
//             AuthRequestDto request) {

//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         request.getUsername(),
//                         request.getPassword()
//                 )
//         );

//         SystemUser user =
//                 systemUserRepository
//                         .findByUsername(
//                                 request.getUsername()
//                         )
//                         .orElseThrow(() ->
//                                 new RuntimeException(
//                                         "User not found"
//                                 )
//                         );

//         String token =
//                 jwtService.generateToken(user);

//         return new AuthResponseDto(
//                 token,
//                 user.getId(),
//                 user.getUsername(),
//                 user.getRole() != null
//                         ? user.getRole().name()
//                         : null
//         );
//     }
// }
package com.example.demo.service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
import com.example.demo.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final SystemUserRepository systemUserRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthService(
            SystemUserRepository systemUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.systemUserRepository =
                systemUserRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.jwtService =
                jwtService;

        this.authenticationManager =
                authenticationManager;
    }


    /*
     * =====================================================
     * REGISTER
     * =====================================================
     */

    public AuthResponseDto register(
            SystemUser request) {

        if (request.getUsername() == null ||
                request.getUsername().trim().isEmpty()) {

            throw new RuntimeException(
                    "Username is required"
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "Password is required"
            );
        }

        if (request.getRole() == null) {

            throw new RuntimeException(
                    "Role is required"
            );
        }

        if (systemUserRepository
                .existsByUsername(
                        request.getUsername()
                )) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        request.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        SystemUser savedUser =
                systemUserRepository.save(
                        request
                );

        String token =
                jwtService.generateToken(
                        savedUser
                );

        return new AuthResponseDto(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole().name()
        );
    }


    /*
     * =====================================================
     * LOGIN
     * =====================================================
     */

    public AuthResponseDto authenticate(
            AuthRequestDto request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        SystemUser user =
                systemUserRepository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        String token =
                jwtService.generateToken(
                        user
                );

        return new AuthResponseDto(
                token,
                user.getId(),
                user.getUsername(),
                user.getRole() != null
                        ? user.getRole().name()
                        : null
        );
    }
}