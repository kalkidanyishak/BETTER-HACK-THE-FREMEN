import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];