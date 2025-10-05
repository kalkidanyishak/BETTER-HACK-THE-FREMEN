import { ColumnDef } from "@tanstack/react-table";

// Assuming you have your Prisma-generated types available

// Customer Columns
export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (row.getValue("isActive") ? "Yes" : "No"),
  },
  {
    accessorKey: "joinedAt",
    header: "Joined Date",
    cell: ({ row }) => new Date(row.getValue("joinedAt")).toLocaleDateString(),
  },
];

// Contact Columns
// Note: This assumes you fetch the related 'customer' data with each contact.
export const contactColumns: ColumnDef<Contact & { customer: Customer }>[] = [
  {
    accessorKey: "name",
    header: "Contact Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
//   {
//     // Accessing a nested object property
//     accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
//     id: "customerName",
//     header: "Associated Customer",
//   },
];

// Opportunity Columns
// Note: This assumes you fetch the related 'customer' data with each opportunity.
export const opportunityColumns: ColumnDef<Opportunity & { customer: Customer }>[] = [
  {
    accessorKey: "title",
    header: "Opportunity Title",
  },
//   {
//     // Accessing a nested object property
//     accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
//     id: "customerName",
//     header: "Customer",
//   },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "expectedClose",
    header: "Expected Close",
    cell: ({ row }) => {
      const date = row.getValue("expectedClose") as Date | null;
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
  },
];

// Interaction Columns
// Note: This assumes you fetch related 'customer' and 'contact' data.
export const interactionColumns: ColumnDef<
  Interaction & { customer: Customer; contact: Contact | null }
>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
//   {
//     // Accessing a nested object property
//     accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
//     id: "customerName",
//     header: "Customer",
//   },
  {
    // Accessing an optional nested object property
    accessorFn: (row) => row.contact?.name ?? "N/A",
    id: "contactName",
    header: "Contact",
  },
  {
    accessorKey: "occurredAt",
    header: "Date of Interaction",
    cell: ({ row }) =>
      new Date(row.getValue("occurredAt")).toLocaleString(),
  },
];