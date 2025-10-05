"use client"

import { GenericCrudPage } from "@/components/main/generic-crud";
import { opportunityFields } from "@/lib/crm/form-config";
import { opportunityColumns } from "@/lib/crm/table-config";

export default function OpportunitiesPage() {
  return (
    <GenericCrudPage<OpportunityWithCustomer>
      queryKey={["opportunities"]}
      apiRoute="opportunities"
      title="Opportunities"
      singularTitle="Opportunity"
      tableConfig={opportunityColumns}
      formConfig={opportunityFields}
    />
  );
}