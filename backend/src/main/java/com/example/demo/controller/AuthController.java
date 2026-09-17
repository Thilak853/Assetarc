 
package com.example.demo.controller;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.entity.SystemUser;
import com.example.demo.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================================================
    // REGISTER
    // =========================================================

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @RequestBody SystemUser request) {

        AuthResponseDto response =
                authService.register(request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @RequestBody AuthRequestDto request) {

        AuthResponseDto response =
                authService.authenticate(request);

        return ResponseEntity.ok(response);
    }
}