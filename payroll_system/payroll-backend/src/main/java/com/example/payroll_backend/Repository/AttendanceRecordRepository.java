package com.example.payroll_backend.Repository;

import com.example.payroll_backend.Model.AttendanceRecordModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecordModel, Long> {
    Optional<AttendanceRecordModel> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
}
