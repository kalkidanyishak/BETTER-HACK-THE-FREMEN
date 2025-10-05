"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { payrollFields } from "@/lib/hr/form-config";
import { payrollColumns } from "@/lib/hr/table-config";


export default function PayrollPage() {
  return (
    <GenericCrudPage<Payroll>
      queryKey={["payrolls"]}
      apiRoute="/payrolls"
      title="Payrolls"
      singularTitle="Payroll"
      tableConfig={payrollColumns}
      formConfig={payrollFields}
    />
  );
}