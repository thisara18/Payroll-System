package com.example.payroll_backend.Model;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

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

    public EmployeeModel() {
    }

    public EmployeeModel(String employeeCode, String firstName, String lastName, LocalDate dateOfBirth, String gender, String email, String phoneNumber, String address, String city, String department, String designation, String status, LocalDate dateOfHired, BigDecimal basicSalary, BigDecimal totalAllowances, BigDecimal totalDeductions, String taxId, String bankAccount) {
        this.employeeCode = employeeCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.department = department;
        this.designation = designation;
        this.status = status;
        this.dateOfHired = dateOfHired;
        this.basicSalary = basicSalary;
        this.totalAllowances = totalAllowances;
        this.totalDeductions = totalDeductions;
        this.taxId = taxId;
        this.bankAccount = bankAccount;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDateOfHired() {
        return dateOfHired;
    }

    public void setDateOfHired(LocalDate dateOfHired) {
        this.dateOfHired = dateOfHired;
    }

    public BigDecimal getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(BigDecimal basicSalary) {
        this.basicSalary = basicSalary;
    }

    public BigDecimal getTotalAllowances() {
        return totalAllowances;
    }

    public void setTotalAllowances(BigDecimal totalAllowances) {
        this.totalAllowances = totalAllowances;
    }

    public BigDecimal getTotalDeductions() {
        return totalDeductions;
    }

    public void setTotalDeductions(BigDecimal totalDeductions) {
        this.totalDeductions = totalDeductions;
    }

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }
}
