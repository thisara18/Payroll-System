package com.example.payroll_backend.Service;

import com.example.payroll_backend.Model.AttendanceRecordModel;
import com.example.payroll_backend.Repository.AttendanceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRecordRepository attendanceRecordRepository;

    public String clockIn(Long employeeId) {
        LocalDate today = LocalDate.now();

        Optional<AttendanceRecordModel> existingRecord =
                attendanceRecordRepository.findByEmployeeIdAndDate(employeeId, today);

        if (existingRecord.isPresent()) {
            return "You already clocked in today!";
        }

        AttendanceRecordModel record = new AttendanceRecordModel();
        record.setEmployeeId(employeeId);
        record.setDate(today);
        record.setClockInTime(LocalDateTime.now());

        attendanceRecordRepository.save(record);

        return "Clock-in successful at " + record.getClockInTime();
    }

    public String clockOut(Long employeeId) {
        LocalDate today = LocalDate.now();

        Optional<AttendanceRecordModel> recordOpt =
                attendanceRecordRepository.findByEmployeeIdAndDate(employeeId, today);

        if (recordOpt.isEmpty()) {
            return "No clock-in record found for today!";
        }

        AttendanceRecordModel record = recordOpt.get();

        if (record.getClockOutTime() != null) {
            return "You already clocked out today!";
        }

        record.setClockOutTime(LocalDateTime.now());
        attendanceRecordRepository.save(record);

        return "Clock-out successful at " + record.getClockOutTime();
    }
}
