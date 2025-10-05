"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { leaveFields } from "@/lib/hr/form-config";
import { leaveColumns } from "@/lib/hr/table-config";


export default function LeavePage() {
  return (
    <GenericCrudPage<Leave>
      queryKey={["leaves"]}
      apiRoute="/leaves"
      title="Leave Requests"
      singularTitle="Leave Request"
      tableConfig={leaveColumns}
      formConfig={leaveFields}
    />
  );
}