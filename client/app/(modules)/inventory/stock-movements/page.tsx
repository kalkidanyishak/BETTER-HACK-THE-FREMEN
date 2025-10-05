"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { stockMovementFields } from "@/lib/inventory/form-config";
import { stockMovementColumns } from "@/lib/inventory/table-config";

export default function StockMovementPage() {
  return (
    <GenericCrudPage<StockMovement>
      queryKey={['stockMovements']}
      apiRoute="/stock-movements"
      title="Stock Movements"
      singularTitle="Stock Movement"
      tableConfig={stockMovementColumns}
      formConfig={stockMovementFields}
    />
  );
}