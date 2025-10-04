"use client"
import { CustomForm, FormItem } from "@/components/main/data-form";
import { userFields } from "@/lib/form-config";

export default function Page() {
  return (
    <CustomForm
      fields={userFields}
      onSubmit={(data) => {
        console.log(data);
      }}
    />
  );
}
