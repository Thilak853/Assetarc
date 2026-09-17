

package com.example.demo.config;

import com.example.demo.repository.SystemUserRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class ApplicationConfig {

    @Bean
    public UserDetailsService userDetailsService(
            SystemUserRepository repository) {

        return username -> {

            return repository
                    .findByUsername(username)
                    .map(user -> {

                        if (user.getRole() == null) {

                            throw new UsernameNotFoundException(
                                    "User role not configured: "
                                            + username
                            );
                        }

                        return org.springframework.security
                                .core.userdetails.User
                                .withUsername(
                                        user.getUsername()
                                )
                                .password(
                                        user.getPassword()
                                )
                                .roles(
                                        user.getRole().name()
                                )
                                .build();

                    })
                    .orElseThrow(() ->
                            new UsernameNotFoundException(
                                    "User not found: "
                                            + username
                            )
                    );
        };
    }
}