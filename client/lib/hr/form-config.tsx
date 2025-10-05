import { FormItem } from "@/components/main/data-form";
import { z } from "zod";

// Assuming a FormItem type definition like this

// --- Employee Schema ---
export const employeeFields: FormItem[] = [
  "employee",
  {
    type: "text",
    name: "firstName",
    placeholder: "Enter first name",
    zodVal: z.string().min(1, "First name is required"),
  },
  {
    type: "text",
    name: "lastName",
    placeholder: "Enter last name",
    zodVal: z.string().min(1, "Last name is required"),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter email address",
    zodVal: z.string().email("Invalid email address"),
  },
  {
    type: "text",
    name: "phone",
    placeholder: "Enter phone number (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "date",
    name: "hireDate",
    placeholder: "Select hire date",
    zodVal: z.coerce.date(),
  },
  {
    type: "number",
    name: "salary",
    placeholder: "Enter salary",
    zodVal: z.coerce.number().positive("Salary must be a positive number"),
  },
  {
    type: "select",
    name: "positionId",
    placeholder: "Select position",
    zodVal: z.coerce.number().int().positive("A position must be selected"),
  },
  {
    type: "select",
    name: "departmentId",
    placeholder: "Select department",
    zodVal: z.coerce.number().int().positive("A department must be selected"),
  },
];

// --- Department Schema ---
export const departmentFields: FormItem[] = [
  "department",
  {
    type: "text",
    name: "name",
    placeholder: "Enter department name",
    zodVal: z.string().min(1, "Department name is required"),
  },
];

// --- Position Schema ---
export const positionFields: FormItem[] = [
  "position",
  {
    type: "text",
    name: "title",
    placeholder: "Enter position title",
    zodVal: z.string().min(1, "Position title is required"),
  },
  {
    type: "text",
    name: "level",
    placeholder: "Enter position level (optional)",
    zodVal: z.string().optional(),
  },
];

// --- Attendance Schema ---
export const attendanceFields: FormItem[] = [
  "attendance",
  {
    type: "select",
    name: "employeeId",
    placeholder: "Select employee",
    zodVal: z.coerce.number().int().positive("An employee must be selected"),
  },
  {
    type: "date",
    name: "date",
    placeholder: "Select attendance date",
    zodVal: z.coerce.date(),
  },
  {
    type: "select",
    name: "status",
    placeholder: "Select attendance status",
    zodVal: z.enum(["PRESENT", "ABSENT", "LEAVE", "REMOTE"]),
  },
];

// --- Leave Schema ---
export const leaveFields: FormItem[] = [
  "leave",
  {
    type: "select",
    name: "employeeId",
    placeholder: "Select employee",
    zodVal: z.coerce.number().int().positive("An employee must be selected"),
  },
  {
    type: "date",
    name: "startDate",
    placeholder: "Select start date",
    zodVal: z.coerce.date(),
  },
  {
    type: "date",
    name: "endDate",
    placeholder: "Select end date",
    zodVal: z.coerce.date(),
  },
  {
    type: "select",
    name: "type",
    placeholder: "Select leave type",
    zodVal: z.enum(["SICK", "VACATION", "PERSONAL", "UNPAID"]),
  },
  {
    type: "select",
    name: "status",
    placeholder: "Select leave status",
    zodVal: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  },
  {
    type: "textarea",
    name: "reason",
    placeholder: "Enter reason for leave (optional)",
    zodVal: z.string().optional(),
  },
];

// --- Payroll Schema ---
export const payrollFields: FormItem[] = [
  "payroll",
  {
    type: "select",
    name: "employeeId",
    placeholder: "Select employee",
    zodVal: z.coerce.number().int().positive("An employee must be selected"),
  },
  {
    type: "number",
    name: "month",
    placeholder: "Enter payroll month (1-12)",
    zodVal: z.coerce.number().int().min(1).max(12),
  },
  {
    type: "number",
    name: "year",
    placeholder: "Enter payroll year (e.g., 2024)",
    zodVal: z.coerce.number().int().min(1900, "Please enter a valid year"),
  },
  {
    type: "number",
    name: "baseSalary",
    placeholder: "Enter base salary",
    zodVal: z.coerce.number().positive("Base salary must be a positive number"),
  },
  {
    type: "number",
    name: "bonus",
    placeholder: "Enter bonus (optional)",
    zodVal: z.coerce.number().min(0, "Bonus cannot be negative").optional(),
  },
  {
    type: "number",
    name: "deductions",
    placeholder: "Enter deductions (optional)",
    zodVal: z.coerce.number().min(0, "Deductions cannot be negative").optional(),
  },
];