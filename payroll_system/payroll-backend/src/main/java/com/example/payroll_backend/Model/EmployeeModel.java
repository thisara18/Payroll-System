package com.example.payroll_backend.Model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    private LocalDate dateOfBirth;
    private String gender;
    private String nationalId;
    private String email;
    private String phoneNumber;



}
