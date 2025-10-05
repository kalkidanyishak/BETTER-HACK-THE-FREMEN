type User = {
  id: number;
  name: string;
  email: string;
};

// src/types/data-types.ts

type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  category: { name: string };
  supplier: { name: string };
};

type Category = {
  id: number;
  name: string;
};

type Supplier = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
};

type Warehouse = {
  id: number;
  name: string;
  location?: string | null;
};

type Stock = {
  id: number;
  quantity: number;
  product: { name: string };
  warehouse: { name: string };
};

type StockMovement = {
  id: number;
  type: "IN" | "OUT";
  quantity: number;
  createdAt: Date;
  stock: {
    product: { name: string };
    warehouse: { name: string };
  };
};



type Department = { id: number; name: string };
type Position = { id: number; title: string; level?: string };
type AttendanceStatus = "PRESENT" | "ABSENT" | "LEAVE" | "REMOTE";
type LeaveType = "SICK" | "VACATION" | "PERSONAL" | "UNPAID";
type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  hireDate: string; // Assuming ISO string from API
  salary: number;
  position: Position; // Nested object
  department: Department; // Nested object
};

type Attendance = {
  id: number;
  employeeId: number;
  date: string; // Assuming ISO string
  status: AttendanceStatus;
  employee: { // Nested employee data
    firstName: string;
    lastName: string;
  };
};

type Leave = {
  id: number;
  employeeId: number;
  startDate: string; // Assuming ISO string
  endDate: string; // Assuming ISO string
  type: LeaveType;
  status: LeaveStatus;
  reason?: string;
  employee: { // Nested employee data
    firstName: string;
    lastName: string;
  };
};

type Payroll = {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  employee: { // Nested employee data
    firstName: string;
    lastName: string;
  };
};
