package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<Map<String, Object>> buildError(HttpStatus status, String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("message", message);
        error.put("status", status.value());
        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException exception) {
        return buildError(HttpStatus.NOT_FOUND, "Requested resource was not found.");
    }



    
    @ExceptionHandler(BusinessValidationException.class)
    public ResponseEntity<?> handleBusinessException(
            BusinessValidationException exception) {


        Map<String,Object> error =
                new HashMap<>();


        error.put("timestamp",
                LocalDateTime.now());


        error.put("message",
                exception.getMessage());


        error.put("status",
                HttpStatus.CONFLICT.value());



        return new ResponseEntity<>(
                error,
                HttpStatus.CONFLICT
        );
    }



    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(
            IllegalArgumentException exception) {


        Map<String,Object> error =
                new HashMap<>();


        error.put("timestamp",
                LocalDateTime.now());


        error.put("message",
                exception.getMessage());


        error.put("status",
                HttpStatus.BAD_REQUEST.value());



        return new ResponseEntity<>(
                error,
                HttpStatus.BAD_REQUEST
        );
    }




    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(
            Exception exception) {


        Map<String,Object> error =
                new HashMap<>();


        error.put("timestamp",
                LocalDateTime.now());


        error.put("message",
                exception.getMessage());


        error.put("status",
                HttpStatus.INTERNAL_SERVER_ERROR.value());



        return new ResponseEntity<>(
                error,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}