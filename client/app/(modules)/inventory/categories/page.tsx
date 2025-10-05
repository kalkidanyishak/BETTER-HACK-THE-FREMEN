"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { categoryFields } from "@/lib/inventory/form-config";
import { categoryColumns } from "@/lib/inventory/table-config";

export default function CategoryPage() {
  return (
    <GenericCrudPage<Category>
      queryKey={['categories']}
      apiRoute="/categories"
      title="Categories"
      singularTitle="Category"
      tableConfig={categoryColumns}
      formConfig={categoryFields}
    />
  );
}
