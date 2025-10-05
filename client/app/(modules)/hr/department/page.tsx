"use client";
import { GenericCrudPage } from "@/components/main/generic-crud";
import { departmentFields } from "@/lib/hr/form-config";
import { departmentColumns } from "@/lib/hr/table-config";


export default function DepartmentPage() {
  return (
    <GenericCrudPage<Department>
      queryKey={["departments"]}
      apiRoute="/departments"
      title="Departments"
      singularTitle="Department"
      tableConfig={departmentColumns}
      formConfig={departmentFields}
    />
  );
}