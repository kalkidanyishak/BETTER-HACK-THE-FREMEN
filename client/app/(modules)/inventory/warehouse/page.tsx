"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { warehouseFields } from "@/lib/inventory/form-config";
import { warehouseColumns } from "@/lib/inventory/table-config";

export default function WarehousePage() {
  return (
    <GenericCrudPage<Warehouse>
      queryKey={['warehouses']}
      apiRoute="/warehouses"
      title="Warehouses"
      singularTitle="Warehouse"
      tableConfig={warehouseColumns}
      formConfig={warehouseFields}
    />
  );
}