"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { productFields } from "@/lib/inventory/form-config";
import { productColumns } from "@/lib/inventory/table-config";

export default function ProductPage() {
  return (
    <GenericCrudPage<Product>
      queryKey={['products']}
      apiRoute="/products"
      title="Products"
      singularTitle="Product"
      tableConfig={productColumns}
      formConfig={productFields}
    />
  );
}