package com.example.payroll_backend.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @PreAuthorize("hasAuthority('Employee')")
    @GetMapping("/test")
    public String testEmployee() {
        return "Hello Employee!";
    }
}