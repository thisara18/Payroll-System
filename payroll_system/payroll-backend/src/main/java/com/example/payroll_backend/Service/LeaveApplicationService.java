package com.example.payroll_backend.Service;


import com.example.payroll_backend.Model.LeaveApplicationModel;
import com.example.payroll_backend.Repository.LeaveApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveApplicationService {
    @Autowired
    private LeaveApplicationRepository leaveApplicationRepository;

    // 1️⃣ Apply for leave with validation
    public String applyLeave(LeaveApplicationModel leave) {
        // Validation
        if (leave.getStartDate() == null || leave.getEndDate() == null) {
            return "Start date and end date are required.";
        }

        if (leave.getStartDate().isBefore(LocalDate.now())) {
            return "Start date cannot be in the past.";
        }

        if (leave.getEndDate().isBefore(leave.getStartDate())) {
            return "End date cannot be before start date.";
        }

        leave.setStatus("PENDING");
        leaveApplicationRepository.save(leave);
        return "Leave applied successfully and is pending approval.";
    }

    // 2️⃣ Get all pending leaves (for managers)
    public List<LeaveApplicationModel> getPendingLeaves() {
        return leaveApplicationRepository.findAll()
                .stream()
                .filter(l -> "PENDING".equalsIgnoreCase(l.getStatus()))
                .toList();
    }

    // 3️⃣ Approve or reject leave
    public String updateLeaveStatus(Long id, String status) {
        LeaveApplicationModel leave = leaveApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!status.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("REJECTED")) {
            return "Invalid status. Use APPROVED or REJECTED.";
        }

        leave.setStatus(status.toUpperCase());
        leaveApplicationRepository.save(leave);
        return "Leave status updated to " + status.toUpperCase();
    }
}
