package com.example.payroll_backend.Controller;


import com.example.payroll_backend.Model.LeaveApplicationModel;
import com.example.payroll_backend.Service.LeaveApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveApplicationController {
    @Autowired
    private LeaveApplicationService leaveService;

    // 1️⃣ POST /api/leaves/apply
    @PostMapping("/apply")
    public ResponseEntity<String> applyForLeave(@RequestBody LeaveApplicationModel leave) {
        String response = leaveService.applyLeave(leave);

        if (response.startsWith("Leave applied")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(response);
    }

    // 2️⃣ GET /api/leaves/pending
    @GetMapping("/pending")
    public ResponseEntity<List<LeaveApplicationModel>> getPendingLeaves() {
        List<LeaveApplicationModel> pendingLeaves = leaveService.getPendingLeaves();
        return ResponseEntity.ok(pendingLeaves);
    }

    // 3️⃣ PUT /api/leaves/{id}/status?status=APPROVED or REJECTED
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateLeaveStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        String response = leaveService.updateLeaveStatus(id, status);

        if (response.startsWith("Leave status updated")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(response);
    }
}
