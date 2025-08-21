package com.example.payroll_backend.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hr")
public class HRController {

    @PreAuthorize("hasAuthority('HR')")
    @GetMapping("/test")
    public String testHr() {
        return "Hello HR!";
    }
}