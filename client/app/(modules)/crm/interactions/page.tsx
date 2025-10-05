"use client";
import { GenericCrudPage } from "@/components/main/generic-crud";
import { interactionFields } from "@/lib/crm/form-config";
import { interactionColumns } from "@/lib/crm/table-config";

export default function InteractionsPage() {
  return (
    <GenericCrudPage<InteractionWithRelations>
      queryKey={["interactions"]}
      apiRoute="interactions"
      title="Interactions"
      singularTitle="Interaction"
      tableConfig={interactionColumns}
      formConfig={interactionFields}
    />
  );
}