// src/app/users/page.tsx (or wherever your user page is)
"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { userFields } from "@/lib/form-config";
import { userColumns } from "@/lib/table-config";

// Assuming you have a User type defined somewhere
interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserPage() {
  return (
    <GenericCrudPage<User>
      queryKey={['users']}
      apiRoute="/users"
      title="Users"
      singularTitle="User"
      tableConfig={userColumns}
      formConfig={userFields}
    />
  );
}