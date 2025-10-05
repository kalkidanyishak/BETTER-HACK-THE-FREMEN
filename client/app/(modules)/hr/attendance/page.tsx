"use client";

import { GenericCrudPage } from "@/components/main/generic-crud";
import { attendanceFields } from "@/lib/hr/form-config";
import { attendanceColumns } from "@/lib/hr/table-config";


export default function AttendancePage() {
  return (
    <GenericCrudPage<Attendance>
      queryKey={["attendances"]}
      apiRoute="/attendances"
      title="Attendances"
      singularTitle="Attendance"
      tableConfig={attendanceColumns}
      formConfig={attendanceFields}
    />
  );
}