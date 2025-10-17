package com.example.payroll_backend.Repository;

import com.example.payroll_backend.Model.LeaveApplicationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveApplicationRepository extends JpaRepository<LeaveApplicationModel, Long> {
    List<LeaveApplicationModel> findByEmployeeId(Long employeeId);
}
