package com.example.demo.config;

import com.example.demo.entity.SystemUser;
import com.example.demo.entity.SystemUser.Role;
import com.example.demo.repository.SystemUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SystemUserRepository systemUserRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(SystemUserRepository systemUserRepository, PasswordEncoder passwordEncoder) {
        this.systemUserRepository = systemUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
    }

    private void seedUsers() {
        if (systemUserRepository.count() == 0) {
            // Admin
            SystemUser admin = new SystemUser();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.SYSTEM_ADMIN);
            systemUserRepository.save(admin);

            // Manager
            SystemUser manager = new SystemUser();
            manager.setUsername("manager");
            manager.setPassword(passwordEncoder.encode("manager123"));
            manager.setRole(Role.ASSET_MANAGER);
            systemUserRepository.save(manager);

            // Tech
            SystemUser tech = new SystemUser();
            tech.setUsername("tech");
            tech.setPassword(passwordEncoder.encode("tech123"));
            tech.setRole(Role.MAINTENANCE_TECHNICIAN);
            systemUserRepository.save(tech);

            // Supervisor
            SystemUser supervisor = new SystemUser();
            supervisor.setUsername("supervisor");
            supervisor.setPassword(passwordEncoder.encode("super123"));
            supervisor.setRole(Role.OPERATIONS_SUPERVISOR);
            systemUserRepository.save(supervisor);
        }
    }
}