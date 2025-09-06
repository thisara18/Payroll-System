import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Building,
  UserCheck,
  Clock,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  ChevronDown,
  Save,
  X,
  LogOut,
  IndianRupee,
  Coins,
  Bitcoin,
  LayoutDashboard,
  MenuIcon,
  Home,
  Briefcase,
  UserCog,
  Receipt,
  PieChart,
  Settings as SettingsIcon,
} from "lucide-react";

const PayrollManagementSystem = () => {
  const navigate = useNavigate();
  
  // Define menuItems before using it
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "employees", label: "Management", icon: Users },
    { id: "payroll", label: "Payroll", icon: DollarSign },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  // State declarations
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [payrolls, setPayrolls] = useState([
    // Keep existing payroll data for now
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Nisura Sahan",
      month: "2024-02",
      basicSalary: 75000,
      allowances: 5000,
      overtime: 1200,
      deductions: 2000,
      tax: 12000,
      netPay: 67200,
      status: "Paid",
    },
    // ... other payroll entries
  ]);

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];

  const API_BASE_URL = "http://localhost:8080/api";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    validateField(name, value);
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true);

      if (modalType === "add") {
        await addEmployee(formData);
      } else if (modalType === "edit") {
        await updateEmployee(formData.id, formData);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving employee:", error);
      // Error is already set by the API functions
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        setLoading(true);
        await deleteEmployee(employeeId);
      } catch (error) {
        console.error("Error deleting employee:", error);
        // Error is already set by the deleteEmployee function
      } finally {
        setLoading(false);
      }
    }
  };

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // API Headers with authentication
  const getApiHeaders = () => {
    const token = getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: "GET",
        headers: getApiHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch employees: ${response.statusText}`);
      }
           
      const data = await response.json();
      console.log("Fetched employees:", data);
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const addEmployee = async (employeeData) => {
    try {   
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify({
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          phoneNumber: employeeData.phone,
          department: employeeData.department,
          designation: employeeData.designation,
          dateOfBirth: employeeData.dateOfBirth,
          dateOfHired: employeeData.dateHired,
          gender: employeeData.gender,
          status: employeeData.status,
          basicSalary: parseFloat(employeeData.basicSalary) || 0,
          totalAllowances: parseFloat(employeeData.allowances) || 0,
          totalDeductions: parseFloat(employeeData.deductions) || 0,
          address: employeeData.address,
          city: employeeData.city,
          bankAccount: employeeData.bankAccount,
          taxId: employeeData.taxId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add employee: ${response.statusText}`);
      }

      const newEmployee = await response.json();
      console.log("Added employee:", newEmployee);

      await fetchEmployees();
      return newEmployee;
    } catch (err) {
      console.error("Error adding employee:", err);
      setError(err.message);
      throw err;
    }
  };

  // Update employee
  const updateEmployee = async (employeeId, employeeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method: "PUT",
        headers: getApiHeaders(),
        body: JSON.stringify({
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          phoneNumber: employeeData.phone,
          department: employeeData.department,
          designation: employeeData.designation,
          dateOfBirth: employeeData.dateOfBirth,
          dateOfHired: employeeData.dateHired,
          gender: employeeData.gender,
          status: employeeData.status,
          basicSalary: parseFloat(employeeData.basicSalary) || 0,
          totalAllowances: parseFloat(employeeData.allowances) || 0,
          totalDeductions: parseFloat(employeeData.deductions) || 0,
          address: employeeData.address,
          city: employeeData.city,
          bankAccount: employeeData.bankAccount,
          taxId: employeeData.taxId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update employee: ${response.statusText}`);
      }

      const updatedEmployee = await response.json();
      console.log("Updated employee:", updatedEmployee);

      await fetchEmployees();
      return updatedEmployee;
    } catch (err) {
      console.error("Error updating employee:", err);
      setError(err.message);
      throw err;
    }
  };

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
        method: "DELETE",
        headers: getApiHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete employee: ${response.statusText}`);
      }

      console.log("Deleted employee with ID:", employeeId);

      await fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError(err.message);
      throw err;
    }
  };

  // Initialize form data
  const initFormData = () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    dateOfBirth: "",
    dateHired: "",
    gender: "Male",
    status: "Active",
    basicSalary: "",
    allowances: "",
    deductions: "",
    address: "",
    city: "",
    bankAccount: "",
    taxId: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openModal = (type, employee = null) => {
    setModalType(type);
    if (type === "add") {
      setFormData(initFormData());
    } else if (employee) {
      // Map backend fields to frontend form fields
      setFormData({
        id: employee.id,
        employeeCode: employee.employeeCode,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phoneNumber,
        department: employee.department,
        designation: employee.designation,
        dateOfBirth: employee.dateOfBirth,
        dateHired: employee.dateHired,
        gender: employee.gender,
        status: employee.status,
        basicSalary: employee.basicSalary,
        allowances: employee.totalAllowances,
        deductions: employee.totalDeductions,
        address: employee.address,
        city: employee.city,
        bankAccount: employee.bankAccount,
        taxId: employee.taxId,
      });
      setSelectedEmployee(employee);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setFormData({});
    setError(null);
    // Reset validation states
    setFormErrors({});
    setTouched({});
  };

  // Field validation function
  const validateField = (name, value) => {
    const newErrors = { ...formErrors };

    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          newErrors.firstName = "First name is required";
        } else if (value.trim().length < 2) {
          newErrors.firstName = "First name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.firstName =
            "First name can only contain letters and spaces";
        } else {
          delete newErrors.firstName;
        }
        break;

      case "lastName":
        if (!value || value.trim() === "") {
          newErrors.lastName = "Last name is required";
        } else if (value.trim().length < 2) {
          newErrors.lastName = "Last name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.lastName = "Last name can only contain letters and spaces";
        } else {
          delete newErrors.lastName;
        }
        break;

      case "email":
        if (!value || value.trim() === "") {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
          newErrors.phone = "Please enter a valid phone number";
        } else if (value && value.replace(/\D/g, "").length < 10) {
          newErrors.phone = "Phone number must be at least 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;

      case "department":
        if (!value || value.trim() === "") {
          newErrors.department = "Department is required";
        } else {
          delete newErrors.department;
        }
        break;

      case "designation":
        if (!value || value.trim() === "") {
          newErrors.designation = "Designation is required";
        } else if (value.trim().length < 2) {
          newErrors.designation = "Designation must be at least 2 characters";
        } else {
          delete newErrors.designation;
        }
        break;

      case "dateOfBirth":
        if (value) {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18 || age > 65) {
            newErrors.dateOfBirth =
              "Employee must be between 18 and 65 years old";
          } else {
            delete newErrors.dateOfBirth;
          }
        }
        break;

      case "dateHired":
        if (!value || value.trim() === "") {
          newErrors.dateHired = "Date hired is required";
        } else {
          const hiredDate = new Date(value);
          const today = new Date();
          if (hiredDate > today) {
            newErrors.dateHired = "Date hired cannot be in the future";
          } else {
            delete newErrors.dateHired;
          }
        }
        break;

      case "basicSalary":
        const salary = parseFloat(value);
        if (!value || value.trim() === "") {
          newErrors.basicSalary = "Basic salary is required";
        } else if (isNaN(salary) || salary <= 0) {
          newErrors.basicSalary = "Basic salary must be a positive number";
        } else if (salary < 10000) {
          newErrors.basicSalary = "Basic salary must be at least Rs. 10,000";
        } else {
          delete newErrors.basicSalary;
        }
        break;

      case "allowances":
        if (value && value.trim() !== "") {
          const allowances = parseFloat(value);
          if (isNaN(allowances) || allowances < 0) {
            newErrors.allowances = "Allowances must be a positive number";
          } else {
            delete newErrors.allowances;
          }
        } else {
          delete newErrors.allowances;
        }
        break;

      case "deductions":
        if (value && value.trim() !== "") {
          const deductions = parseFloat(value);
          if (isNaN(deductions) || deductions < 0) {
            newErrors.deductions = "Deductions must be a positive number";
          } else {
            delete newErrors.deductions;
          }
        } else {
          delete newErrors.deductions;
        }
        break;

      case "bankAccount":
        if (value && !/^\d{10,20}$/.test(value.replace(/\s/g, ""))) {
          newErrors.bankAccount = "Bank account must be 10-20 digits";
        } else {
          delete newErrors.bankAccount;
        }
        break;

      case "taxId":
        if (value && !/^[A-Z0-9]{6,15}$/.test(value.toUpperCase())) {
          newErrors.taxId = "Tax ID must be 6-15 alphanumeric characters";
        } else {
          delete newErrors.taxId;
        }
        break;

      default:
        break;
    }

    setFormErrors(newErrors);
  };

  // Form validation function
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "department",
      "designation",
      "dateHired",
      "basicSalary",
    ];
    const newErrors = {};

    // Validate all required fields
    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || value.toString().trim() === "") {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });

    // Run individual field validations for all fields with values
    Object.keys(formData).forEach((field) => {
      if (formData[field] !== undefined && formData[field] !== "") {
        validateField(field, formData[field]);
      }
    });

    // Merge required field errors with existing validation errors
    const allErrors = { ...formErrors, ...newErrors };
    setFormErrors(allErrors);

    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const newTouched = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    return Object.keys(allErrors).length === 0;
  };

  const generatePayroll = (employee) => {
    const overtime = Math.floor(Math.random() * 2000);
    const tax =
      (employee.basicSalary + employee.totalAllowances + overtime) * 0.15;
    const netPay =
      employee.basicSalary +
      employee.totalAllowances +
      overtime -
      employee.totalDeductions -
      tax;

    const newPayroll = {
      id: payrolls.length + 1,
      employeeId: employee.employeeCode,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      month: new Date().toISOString().slice(0, 7),
      basicSalary: employee.basicSalary,
      allowances: employee.totalAllowances,
      overtime,
      deductions: employee.totalDeductions,
      tax: Math.round(tax),
      netPay: Math.round(netPay),
      status: "Generated",
    };

    setPayrolls([...payrolls, newPayroll]);
    alert("Payroll generated successfully!");
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      (emp.firstName &&
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.lastName &&
        emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.employeeCode &&
        emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.department &&
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Show loading spinner
  if (loading && employees.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Personal Information" },
    { number: 2, title: "Employment Details" },
    { number: 3, title: "Salary Information" },
    { number: 4, title: "Additional Information" }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Modify the modal form section to include stepper and step navigation
  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information fields */}
              {modalType === "edit" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Code
                  </label>
                  <input
                    type="text"
                    value={formData.employeeCode || ""}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g., +1 (555) 123-4567"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.dateOfBirth
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender || "Male"}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employment Details fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.department
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {formErrors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.department}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.designation
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                  placeholder="e.g., Software Engineer"
                />
                {formErrors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.designation}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Hired <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateHired"
                  value={formData.dateHired || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.dateHired
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {formErrors.dateHired && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.dateHired}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status || "Active"}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salary Information fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Basic Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.basicSalary
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  min="0"
                  step="1000"
                  required
                />
                {formErrors.basicSalary && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.basicSalary}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  value={formData.allowances || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.allowances
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  min="0"
                  step="100"
                  placeholder="e.g., 5000"
                />
                {formErrors.allowances && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.allowances}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  value={formData.deductions || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.deductions
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  min="0"
                  step="100"
                  placeholder="e.g., 1000"
                />
                {formErrors.deductions && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.deductions}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Additional Information fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount || ""}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.bankAccount
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Account number (10-20 digits)"
                  />
                  {formErrors.bankAccount && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.bankAccount}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.taxId
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Tax identification number (6-15 characters)"
                />
                {formErrors.taxId && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.taxId}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-200 border-r border-gray-200 fixed h-full transition-all duration-300 z-30`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {sidebarOpen ? (
              <span className="text-xl font-semibold text-gray-800">PayrollMS</span>
            ) : (
              <span className="text-xl font-semibold text-gray-800">P</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MenuIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 right-0 left-0 z-20 flex items-center">
          <div className={`flex-1 px-6 flex items-center justify-between ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
            <h1 className="text-2xl font-bold text-gray-900">
              {menuItems.find(item => item.id === activeTab)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16 p-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-6 mt-4 rounded">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={() => setError(null)}
                className="float-right text-red-700 hover:text-red-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Employees"
                  value={employees.length}
                  icon={Users}
                  color="bg-blue-500"
                  trend="+5% from last month"
                />
                <StatCard
                  title="Active Employees"
                  value={employees.filter((e) => e.status === "Active").length}
                  icon={UserCheck}
                  color="bg-green-500"
                  trend="+2% from last month"
                />
                <StatCard
                  title="Monthly Payroll"
                  value={`Rs.${payrolls
                    .reduce((sum, p) => sum + p.netPay, 0)
                    .toLocaleString()}`}
                  icon={DollarSign}
                  color="bg-purple-500"
                  trend="+8% from last month"
                />
                <StatCard
                  title="Pending Payments"
                  value={payrolls.filter((p) => p.status === "Pending").length}
                  icon={Clock}
                  color="bg-orange-500"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {payrolls.slice(0, 5).map((payroll) => (
                    <div
                      key={payroll.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bitcoin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Payroll generated for {payroll.employeeName}
                          </p>
                          <p className="text-xs text-gray-500">{payroll.month}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          payroll.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payroll.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "employees" && (
            <div className="space-y-6">
              {/* Search and Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={fetchEmployees}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      disabled={loading}
                    >
                      <Filter className="h-4 w-4" />
                      <span>{loading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                    <button
                      onClick={() => openModal("add")}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Employee</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Designation
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {employee.firstName?.[0]}
                                  {employee.lastName?.[0]}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {employee.firstName} {employee.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {employee.employeeCode}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.designation}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs.{employee.basicSalary?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                employee.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openModal("view", employee)}
                                className="text-blue-600 hover:text-blue-900"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openModal("edit", employee)}
                                className="text-green-600 hover:text-green-900"
                                title="Edit Employee"
                                disabled={loading}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(employee.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete Employee"
                                disabled={loading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => generatePayroll(employee)}
                                className="text-purple-600 hover:text-purple-900"
                                title="Generate Payroll"
                              >
                                <DollarSign className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* No employees message */}
              {filteredEmployees.length === 0 && !loading && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No employees found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm
                      ? "Try adjusting your search criteria."
                      : "Get started by adding your first employee."}
                  </p>
                  <button
                    onClick={() => openModal("add")}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "payroll" && (
            <div className="space-y-6">
              {/* Payroll Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Payroll Management
                    </h2>
                    <p className="text-gray-600">
                      Manage employee payrolls and payments
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>February 2024</option>
                      <option>January 2024</option>
                      <option>December 2023</option>
                    </select>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Generate All Payroll
                    </button>
                  </div>
                </div>
              </div>

              {/* Payroll Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Basic Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Allowances
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Deductions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Net Pay
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payrolls.map((payroll) => (
                        <tr key={payroll.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {payroll.employeeName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payroll.employeeId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payroll.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs{payroll.basicSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs.{payroll.allowances.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs
                            {(payroll.deductions + payroll.tax).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Rs.{payroll.netPay.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                payroll.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : payroll.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {payroll.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Reports & Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
                    <FileText className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-medium text-gray-900">Employee Report</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Complete employee information report
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
                    <DollarSign className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-medium text-gray-900">Payroll Summary</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Monthly payroll summary report
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer">
                    <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
                    <h3 className="font-medium text-gray-900">Tax Report</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Tax deduction and compliance report
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {modalType === "view"
                      ? "Employee Details"
                      : modalType === "edit"
                      ? "Edit Employee"
                      : "Add New Employee"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {modalType === "view" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee Code
                          </label>
                          <p className="text-sm text-gray-900">
                            {selectedEmployee?.employeeCode}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <p className="text-sm text-gray-900">
                            {selectedEmployee?.firstName}{" "}
                            {selectedEmployee?.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <p className="text-sm text-gray-900 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {selectedEmployee?.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <p className="text-sm text-gray-900 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {selectedEmployee?.phoneNumber}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <p className="text-sm text-gray-900 flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            {selectedEmployee?.department}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                          </label>
                          <p className="text-sm text-gray-900">
                            {selectedEmployee?.designation}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Basic Salary
                          </label>
                          <p className="text-sm text-gray-900">
                            Rs.{selectedEmployee?.basicSalary?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date Hired
                          </label>
                          <p className="text-sm text-gray-900">
                            {selectedEmployee?.dateOfHired}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              selectedEmployee?.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedEmployee?.status}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <p className="text-sm text-gray-900 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {selectedEmployee?.address}, {selectedEmployee?.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Stepper */}
                      <div className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-8">
                          {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  currentStep >= step.number
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {step.number}
                              </div>
                              <div className="ml-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {step.title}
                                </p>
                              </div>
                              {index < steps.length - 1 && (
                                <div
                                  className={`h-0.5 w-12 mx-4 ${
                                    currentStep > step.number
                                      ? "bg-blue-600"
                                      : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Form Content */}
                      <div className="px-6">
                        {renderFormContent()}
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <button
                          onClick={handlePrevious}
                          className={`px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ${
                            currentStep === 1 ? 'invisible' : ''
                          }`}
                        >
                          Previous
                        </button>
                        <div className="flex space-x-3">
                          <button
                            onClick={closeModal}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          {currentStep === steps.length ? (
                            <button
                              onClick={handleSave}
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              disabled={loading}
                            >
                              <Save className="h-4 w-4" />
                              <span>{loading ? "Saving..." : "Save Employee"}</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleNext}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PayrollManagementSystem;