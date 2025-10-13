package com.example.payroll_backend.Service;


import com.example.payroll_backend.Model.EmployeeModel;
import com.example.payroll_backend.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeModel> getAllEmployees()
    {
        return employeeRepository.findAll();
    }

    public EmployeeModel getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }
    public EmployeeModel getEmployeeByCode(String employeeCode) {
        return employeeRepository.findByEmployeeCode(employeeCode);
    }
    public EmployeeModel getEmployeeByNic(String nic) {
        return employeeRepository.findByNic(nic);
    }
    public EmployeeModel getEmployeeByPhone(String phoneNumber) {
        return employeeRepository.findByPhoneNumber(phoneNumber);
    }

    public EmployeeModel addEmployee(EmployeeModel employeeModel) {
        String year = String.valueOf(LocalDate.now().getYear());
        long count = employeeRepository.count() + 1;
        String code = String.format("EMP%s-%03d", year, count);
        employeeModel.setEmployeeCode(code);
        return employeeRepository.save(employeeModel);
    }

    public EmployeeModel updateEmployee(Long id, EmployeeModel updated) {
        return employeeRepository.findById(id).map(emp -> {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setDateOfBirth(updated.getDateOfBirth());
            emp.setGender(updated.getGender());
            emp.setEmail(updated.getEmail());
            emp.setPhoneNumber(updated.getPhoneNumber());
            emp.setAddress(updated.getAddress());
            emp.setDepartment(updated.getDepartment());
            emp.setDesignation(updated.getDesignation());
            emp.setStatus(updated.getStatus());
            emp.setDateOfHired(updated.getDateOfHired());
            emp.setBasicSalary(updated.getBasicSalary());
            emp.setCity(updated.getCity());
            emp.setBankAccount(updated.getBankAccount());
            emp.setTaxId(updated.getTaxId());
            emp.setTotalAllowances(updated.getTotalAllowances());
            emp.setTotalDeductions(updated.getTotalDeductions());
            emp.setNic(updated.getNic());
            return employeeRepository.save(emp);
        }).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public EmployeeModel updateEmployeeByCode(String employeeCode, EmployeeModel updated) {
        EmployeeModel emp = employeeRepository.findByEmployeeCode(employeeCode);
        if (emp != null) {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setDateOfBirth(updated.getDateOfBirth());
            emp.setGender(updated.getGender());
            emp.setEmail(updated.getEmail());
            emp.setPhoneNumber(updated.getPhoneNumber());
            emp.setAddress(updated.getAddress());
            emp.setCity(updated.getCity());
            emp.setDepartment(updated.getDepartment());
            emp.setDesignation(updated.getDesignation());
            emp.setStatus(updated.getStatus());
            emp.setDateOfHired(updated.getDateOfHired());
            emp.setBasicSalary(updated.getBasicSalary());
            emp.setTotalAllowances(updated.getTotalAllowances());
            emp.setTotalDeductions(updated.getTotalDeductions());
            emp.setTaxId(updated.getTaxId());
            emp.setBankAccount(updated.getBankAccount());
            emp.setNic(updated.getNic());
            return employeeRepository.save(emp);
        } else {
            return null; // Or throw an exception if employee not found
        }
    }

    public void deleteEmployeeByCode(String employeeCode) {
        EmployeeModel emp = employeeRepository.findByEmployeeCode(employeeCode);
        if (emp != null) {
            employeeRepository.delete(emp);
        }
    }

    public EmployeeModel updateEmployeeByNic(String nic, EmployeeModel updated) {
        EmployeeModel emp = employeeRepository.findByNic(nic);
        if (emp != null) {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setDateOfBirth(updated.getDateOfBirth());
            emp.setGender(updated.getGender());
            emp.setEmail(updated.getEmail());
            emp.setPhoneNumber(updated.getPhoneNumber());
            emp.setAddress(updated.getAddress());
            emp.setCity(updated.getCity());
            emp.setDepartment(updated.getDepartment());
            emp.setDesignation(updated.getDesignation());
            emp.setStatus(updated.getStatus());
            emp.setDateOfHired(updated.getDateOfHired());
            emp.setBasicSalary(updated.getBasicSalary());
            emp.setTotalAllowances(updated.getTotalAllowances());
            emp.setTotalDeductions(updated.getTotalDeductions());
            emp.setTaxId(updated.getTaxId());
            emp.setBankAccount(updated.getBankAccount());
            emp.setNic(updated.getNic());
            return employeeRepository.save(emp);
        } else {
            return null; // Or throw an exception if employee not found
        }
    }

    public void deleteEmployeeByNic(String nic) {
        EmployeeModel emp = employeeRepository.findByNic(nic);
        if (emp != null) {
            employeeRepository.delete(emp);
        }
    }

    public EmployeeModel updateEmployeeByPhone(String phoneNumber, EmployeeModel updated) {
        EmployeeModel emp = employeeRepository.findByPhoneNumber(phoneNumber);
        if (emp != null) {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setDateOfBirth(updated.getDateOfBirth());
            emp.setGender(updated.getGender());
            emp.setEmail(updated.getEmail());
            emp.setPhoneNumber(updated.getPhoneNumber());
            emp.setAddress(updated.getAddress());
            emp.setCity(updated.getCity());
            emp.setDepartment(updated.getDepartment());
            emp.setDesignation(updated.getDesignation());
            emp.setStatus(updated.getStatus());
            emp.setDateOfHired(updated.getDateOfHired());
            emp.setBasicSalary(updated.getBasicSalary());
            emp.setTotalAllowances(updated.getTotalAllowances());
            emp.setTotalDeductions(updated.getTotalDeductions());
            emp.setTaxId(updated.getTaxId());
            emp.setBankAccount(updated.getBankAccount());
            emp.setNic(updated.getNic());
            return employeeRepository.save(emp);
        } else {
            return null; // Or throw an exception if employee not found
        }
    }

    public void deleteEmployeeByPhone(String phoneNumber) {
        EmployeeModel emp = employeeRepository.findByPhoneNumber(phoneNumber);
        if (emp != null) {
            employeeRepository.delete(emp);
        }
    }


}
