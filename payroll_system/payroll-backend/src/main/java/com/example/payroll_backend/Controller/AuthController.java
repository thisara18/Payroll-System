package com.example.payroll_backend.Controller;

import com.example.payroll_backend.Model.UserModel;
import com.example.payroll_backend.Repository.UserRepository;
import com.example.payroll_backend.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserModel user) {
        authService.registerUser(user);
        return ResponseEntity.ok("Registration successful.");
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserModel user) {
        boolean isAuthenticated = authService.authenticateUser(user.getEmail(), user.getPassword());
        if (isAuthenticated) {
            UserModel foundUser = userRepository.findByEmail(user.getEmail()).orElseThrow();
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful.",
                    "role", foundUser.getRole().getRoleName()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));
        }
    }
}
