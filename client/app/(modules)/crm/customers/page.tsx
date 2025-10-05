"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { customerFields } from "@/lib/crm/form-config";
import { customerColumns } from "@/lib/crm/table-config";

export default function CustomersPage() {
  return (
    <GenericCrudPage<Customer>
      queryKey={["customers"]}
      apiRoute="customers"
      title="Customers"
      singularTitle="Customer"
      tableConfig={customerColumns}
      formConfig={customerFields}
    />
  );
}