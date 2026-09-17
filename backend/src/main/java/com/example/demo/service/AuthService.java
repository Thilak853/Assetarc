
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

    // =========================================================
    // REGISTER
    // =========================================================

    public AuthResponseDto register(
            SystemUser request) {

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        if (request == null) {

            throw new RuntimeException(
                    "Registration request cannot be null"
            );
        }

        if (request.getUsername() == null ||
                request.getUsername().trim().isEmpty()) {

            throw new RuntimeException(
                    "Username is required"
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().isEmpty()) {

            throw new RuntimeException(
                    "Password is required"
            );
        }

        // -----------------------------------------------------
        // CHECK USERNAME
        // -----------------------------------------------------

        String username =
                request.getUsername().trim();

        if (systemUserRepository
                .existsByUsername(username)) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        request.setUsername(username);

        // -----------------------------------------------------
        // DEFAULT ROLE
        // -----------------------------------------------------

        if (request.getRole() == null) {

            request.setRole(
                    SystemUser.Role
                            .MAINTENANCE_TECHNICIAN
            );
        }

        // -----------------------------------------------------
        // PASSWORD ENCRYPTION
        // -----------------------------------------------------

        request.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // -----------------------------------------------------
        // SAVE USER
        // -----------------------------------------------------

        SystemUser savedUser =
                systemUserRepository.save(
                        request
                );

        // -----------------------------------------------------
        // GENERATE JWT
        // -----------------------------------------------------

        String token =
                jwtService.generateToken(
                        savedUser
                );

        // -----------------------------------------------------
        // RETURN LOGIN RESPONSE
        // -----------------------------------------------------

        return new AuthResponseDto(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getRole() != null
                        ? savedUser.getRole().name()
                        : null
        );
    }

    // =========================================================
    // LOGIN
    // =========================================================

    public AuthResponseDto authenticate(
            AuthRequestDto request) {

        if (request == null) {

            throw new RuntimeException(
                    "Login request cannot be null"
            );
        }

        // -----------------------------------------------------
        // AUTHENTICATE USER
        // -----------------------------------------------------

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

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

        // -----------------------------------------------------
        // GENERATE TOKEN
        // -----------------------------------------------------

        String token =
                jwtService.generateToken(
                        user
                );

        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

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