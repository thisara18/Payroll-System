package com.example.payroll_backend.Controller;

import com.example.payroll_backend.Model.UserModel;
import com.example.payroll_backend.Model.RoleModel;
import com.example.payroll_backend.Repository.UserRepository;
import com.example.payroll_backend.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/change-role")
    public ResponseEntity<?> changeUserRole(@RequestParam Long userId, @RequestParam String roleName) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        RoleModel newRole = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(newRole);
        userRepository.save(user);
        return ResponseEntity.ok("Role updated");
    }
}