// src/app/users/page.tsx (or wherever your user page is)
"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { userFields } from "@/lib/form-config";
import { userColumns } from "@/lib/table-config";

// Assuming you have a User type defined somewhere

export default function CustomerPage() {
  return (
    <GenericCrudPage<User>
      queryKey={['customers']}
      apiRoute="/customers"
      title="Customers"
      singularTitle="Customer"
      tableConfig={userColumns}
      formConfig={userFields}
    />
  );
}