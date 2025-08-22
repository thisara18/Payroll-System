package com.example.payroll_backend.Repository;


import com.example.payroll_backend.Model.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {
    EmployeeModel findByEmail(String email);
    EmployeeModel findByContactNumber(String contactNumber);


}
