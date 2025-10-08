import { ColumnDef } from "@tanstack/react-table";


// For Employee schema
export const employeeColumns: ColumnDef<Employee>[] = [
  // {
  //   accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  //   header: "Full Name",
  // },
  // {
  //  accessorKey: "email",
  //  header: "Email",
  // },
  {
    accessorKey: "department.name", // Access nested data
    header: "Department",
  },
  {
    accessorKey: "position.title", // Access nested data
    header: "Position",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => new Date(row.getValue("hireDate")).toLocaleDateString(),
  },
];

// For Department schema
export const departmentColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
  },
  // You might add a column for employee count if that data is available
  // {
  //   accessorKey: "_count.employees",
  //   header: "Employee Count"
  // }
];

// For Position schema
export const positionColumns: ColumnDef<Position>[] = [
  {
    accessorKey: "title",
    header: "Position Title",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
];

// For Attendance schema
export const attendanceColumns: ColumnDef<Attendance>[] = [
  // {
  //   accessorFn: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
  //   header: "Employee",
  //   id: "employeeName",
  // },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

// For Leave schema
export const leaveColumns: ColumnDef<Leave>[] = [
  // {
  //   accessorFn: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
  //   header: "Employee",
  //   id: "employeeName",
  // },
  {
    accessorKey: "type",
    header: "Leave Type",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
];

// For Payroll schema
export const payrollColumns: ColumnDef<Payroll>[] = [
  // {
  //   accessorFn: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
  //   header: "Employee",
  //   id: "employeeName",
  // },
  {
    header: "Period",
    accessorFn: (row) => `${row.month}/${row.year}`,
  },
  {
    accessorKey: "baseSalary",
    header: "Base Salary",
  },
  {
    accessorKey: "bonus",
    header: "Bonus",
  },
  {
    accessorKey: "deductions",
    header: "Deductions",
  },
  {
    accessorKey: "netSalary",
    header: "Net Salary",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("netSalary"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-bold">{formatted}</div>;
    },
  },
];