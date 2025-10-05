"use client";
import { GenericCrudPage } from "@/components/main/generic-crud";
import { employeeFields } from "@/lib/hr/form-config";
import { employeeColumns } from "@/lib/hr/table-config";

export default function EmployeePage() {
  return (
    <GenericCrudPage<Employee>
      queryKey={["employees"]}
      apiRoute="/employees"
      title="Employees"
      singularTitle="Employee"
      tableConfig={employeeColumns}
      formConfig={employeeFields}
    />
  );
}