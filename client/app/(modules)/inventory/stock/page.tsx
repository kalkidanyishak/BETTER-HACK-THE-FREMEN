"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { stockFields } from "@/lib/inventory/form-config";
import { stockColumns } from "@/lib/inventory/table-config";

export default function StockPage() {
  return (
    <GenericCrudPage<Stock>
      queryKey={['stocks']}
      apiRoute="/stocks"
      title="Stocks"
      singularTitle="Stock"
      tableConfig={stockColumns}
      formConfig={stockFields}
    />
  );
}