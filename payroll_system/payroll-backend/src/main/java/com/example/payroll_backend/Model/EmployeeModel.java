package com.example.payroll_backend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "employees")
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true)
    private String employeeCode;
    private String firstName;
    private String lastName;

    private LocalDate dateOfBirth;
    private String gender;
    private String email;
    private String phoneNumber;
    private String nic;
    private String address;
    private String city;
    private String department;
    private String designation;
    private String status;   // Active, Inactive, Resigned, etc.

    private LocalDate dateOfHired;

    private BigDecimal basicSalary;

    private BigDecimal totalAllowances;
    private BigDecimal totalDeductions;
    private String taxId;
    private String bankAccount;

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }
}
