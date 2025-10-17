package com.example.payroll_backend.Controller;

import com.example.payroll_backend.Model.AttendanceRecordModel;
import com.example.payroll_backend.Repository.AttendanceRecordRepository;
import com.example.payroll_backend.Service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/clock-in")
    public ResponseEntity<String> clockIn(@RequestParam Long employeeId) {
        String message = attendanceService.clockIn(employeeId);
        if (message.startsWith("Clock-in")) {
            return ResponseEntity.ok(message);
        }
        return ResponseEntity.badRequest().body(message);
    }

    @PostMapping("/clock-out")
    public ResponseEntity<String> clockOut(@RequestParam Long employeeId) {
        String message = attendanceService.clockOut(employeeId);
        if (message.startsWith("Clock-out")) {
            return ResponseEntity.ok(message);
        }
        return ResponseEntity.badRequest().body(message);
    }

}
