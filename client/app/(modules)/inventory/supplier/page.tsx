"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { supplierFields } from "@/lib/inventory/form-config";
import { supplierColumns } from "@/lib/inventory/table-config";

export default function SupplierPage() {
  return (
    <GenericCrudPage<Supplier>
      queryKey={['suppliers']}
      apiRoute="/suppliers"
      title="Suppliers"
      singularTitle="Supplier"
      tableConfig={supplierColumns}
      formConfig={supplierFields}
    />
  );
}
