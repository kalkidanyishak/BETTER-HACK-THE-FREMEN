"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { positionFields } from "@/lib/hr/form-config";
import { positionColumns } from "@/lib/hr/table-config";


export default function PositionPage() {
  return (
    <GenericCrudPage<Position>
      queryKey={["positions"]}
      apiRoute="/positions"
      title="Positions"
      singularTitle="Position"
      tableConfig={positionColumns}
      formConfig={positionFields}
    />
  );
}