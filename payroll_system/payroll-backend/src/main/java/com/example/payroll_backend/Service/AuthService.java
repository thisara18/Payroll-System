package com.example.payroll_backend.Service;

import com.example.payroll_backend.Model.UserModel;
import com.example.payroll_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.payroll_backend.Repository.RoleRepository;
import com.example.payroll_backend.Model.RoleModel;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;



    public UserModel registerUser(UserModel user) {
        RoleModel defaultRole = roleRepository.findByRoleName("Employee")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        user.setRole(defaultRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean authenticateUser(String email, String password) {
        Optional<UserModel> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            UserModel foundUser = user.get();
            return passwordEncoder.matches(password, foundUser.getPassword());
        }
        return false;
    }


}

