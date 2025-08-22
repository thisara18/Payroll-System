package com.example.payroll_backend.Config;

import com.example.payroll_backend.Model.RoleModel;
import com.example.payroll_backend.Repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleInitializer {

    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.findByRoleName("Admin").isEmpty()) {
                roleRepository.save(new RoleModel("Admin"));
            }
            if (roleRepository.findByRoleName("HR").isEmpty()) {
                roleRepository.save(new RoleModel("HR"));
            }
            if (roleRepository.findByRoleName("Employee").isEmpty()) {
                roleRepository.save(new RoleModel("Employee"));
            }
        };
    }
}
