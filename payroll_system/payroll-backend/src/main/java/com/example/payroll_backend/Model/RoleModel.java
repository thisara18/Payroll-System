package com.example.payroll_backend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class RoleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName; // Admin, HR, Employee

    // 🔹 Default constructor (required by JPA)
    public RoleModel() {}

    // 🔹 Constructor without ID (useful for creating roles)
    public RoleModel(String roleName) {
        this.roleName = roleName;
    }

    // 🔹 Constructor with ID (optional)
    public RoleModel(Long roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }

    // Getters and setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
}
