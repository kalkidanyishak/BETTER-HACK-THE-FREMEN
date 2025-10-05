import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "id", header:"id"}
];