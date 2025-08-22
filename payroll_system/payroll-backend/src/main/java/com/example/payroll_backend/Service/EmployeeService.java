package com.example.payroll_backend.Service;


import com.example.payroll_backend.Model.EmployeeModel;
import com.example.payroll_backend.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeModel getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public EmployeeModel addEmployee(EmployeeModel employee) {
        return employeeRepository.save(employee);
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
            return employeeRepository.save(emp);
        }).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
