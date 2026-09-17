
// // // // package com.example.demo.config;

// // // // import com.example.demo.entity.SystemUser;
// // // // import com.example.demo.repository.SystemUserRepository;
// // // // import org.springframework.context.annotation.Bean;
// // // // import org.springframework.context.annotation.Configuration;
// // // // import org.springframework.security.authentication.AuthenticationManager;
// // // // import org.springframework.security.authentication.AuthenticationProvider;
// // // // import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// // // // import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// // // // import org.springframework.security.core.authority.SimpleGrantedAuthority;
// // // // import org.springframework.security.core.userdetails.User;
// // // // import org.springframework.security.core.userdetails.UserDetailsService;
// // // // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // // // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // // // import org.springframework.security.crypto.password.PasswordEncoder;

// // // // import java.util.Collections;

// // // // @Configuration
// // // // public class ApplicationConfig {

// // // //     private final SystemUserRepository systemUserRepository;

// // // //     public ApplicationConfig(SystemUserRepository systemUserRepository) {
// // // //         this.systemUserRepository = systemUserRepository;
// // // //     }

// // // //     @Bean
// // // //     public UserDetailsService userDetailsService() {
// // // //         return username -> {
// // // //             SystemUser user = systemUserRepository.findByUsername(username)
// // // //                     .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

// // // //             return new User(
// // // //                     user.getUsername(),
// // // //                     user.getPassword(),
// // // //                     Collections.singletonList(
// // // //                         new SimpleGrantedAuthority("ROLE_" + (user.getRole() != null ? user.getRole().name() : "USER"))
// // // //                     )
// // // //             );
// // // //         };
// // // //     }

// // // //     @Bean
// // // //     public AuthenticationProvider authenticationProvider() {
// // // //         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
// // // //         authProvider.setUserDetailsService(userDetailsService());
// // // //         authProvider.setPasswordEncoder(passwordEncoder());
// // // //         return authProvider;
// // // //     }

// // // //     @Bean
// // // //     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
// // // //         return config.getAuthenticationManager();
// // // //     }

// // // //     @Bean
// // // //     public PasswordEncoder passwordEncoder() {
// // // //         return new BCryptPasswordEncoder();
// // // //     }
// // // // }
// // // package com.example.demo.config;

// // // import com.example.demo.repository.SystemUserRepository;
// // // import org.springframework.context.annotation.Bean;
// // // import org.springframework.context.annotation.Configuration;
// // // import org.springframework.security.core.userdetails.UserDetailsService;
// // // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // // import org.springframework.security.crypto.password.PasswordEncoder;

// // // @Configuration
// // // public class ApplicationConfig {

// // //     @Bean
// // //     public UserDetailsService userDetailsService(
// // //             SystemUserRepository repository) {

// // //         return username -> repository.findByUsername(username)
// // //                 .map(user -> org.springframework.security.core.userdetails.User
// // //                         .withUsername(user.getUsername())
// // //                         .password(user.getPassword())
// // //                         .roles(user.getRole().name())
// // //                         .build())
// // //                 .orElseThrow(() ->
// // //                         new UsernameNotFoundException(
// // //                                 "User not found: " + username
// // //                         ));
// // //     }

// // //     @Bean
// // //     public PasswordEncoder passwordEncoder() {
// // //         return new BCryptPasswordEncoder();
// // //     }
// // // }
// // package com.example.demo.config;

// // import com.example.demo.repository.SystemUserRepository;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;

// // @Configuration
// // public class ApplicationConfig {

// //     @Bean
// //     public UserDetailsService userDetailsService(
// //             SystemUserRepository repository) {

// //         return username ->
// //                 repository.findByUsername(username)
// //                         .map(user ->
// //                                 org.springframework.security.core.userdetails.User
// //                                         .withUsername(user.getUsername())
// //                                         .password(user.getPassword())
// //                                         .roles(user.getRole().name())
// //                                         .build()
// //                         )
// //                         .orElseThrow(() ->
// //                                 new UsernameNotFoundException(
// //                                         "User not found: " + username
// //                                 )
// //                         );
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }
// // }
// package com.example.demo.config;

// import com.example.demo.entity.SystemUser;
// import com.example.demo.repository.SystemUserRepository;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;

// @Configuration
// public class ApplicationConfig {

//     @Bean
//     public UserDetailsService userDetailsService(
//             SystemUserRepository repository) {

//         return username -> {

//             SystemUser systemUser =
//                     repository.findByUsername(username)
//                             .orElseThrow(() ->
//                                     new UsernameNotFoundException(
//                                             "User not found: "
//                                                     + username
//                                     )
//                             );

//             String role =
//                     systemUser.getRole() != null
//                             ? systemUser.getRole().name()
//                             : "ASSET_MANAGER";

//             return User
//                     .withUsername(systemUser.getUsername())
//                     .password(systemUser.getPassword())
//                     .roles(role)
//                     .build();
//         };
//     }
// }
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