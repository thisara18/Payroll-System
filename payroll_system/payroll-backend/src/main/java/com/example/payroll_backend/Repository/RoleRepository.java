package com.example.payroll_backend.Repository;

import com.example.payroll_backend.Model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    Optional<RoleModel> findByRoleName(String roleName);
}