package com.example.payroll_backend.Controller;

import com.example.payroll_backend.Model.UserModel;
import com.example.payroll_backend.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class AuthController {
    @Autowired
    private AuthService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserModel user) {
        userService.registerUser(user);
        return ResponseEntity.ok("Registration successful.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserModel user) {
        boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful.");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }
}
