"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { contactFields } from "@/lib/crm/form-config";
import { contactColumns } from "@/lib/crm/table-config";

export default function ContactsPage() {
  return (
    <GenericCrudPage<ContactWithCustomer>
      queryKey={["contacts"]}
      apiRoute="contacts"
      title="Contacts"
      singularTitle="Contact"
      tableConfig={contactColumns}
      formConfig={contactFields}
    />
  );
}