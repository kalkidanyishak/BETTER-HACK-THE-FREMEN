"use client";


import { DataTable } from "@/components/main/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: number;
  name: string;
  email: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" },
  { id: 4, name: "David", email: "david@mail.com" },
  { id: 5, name: "Eve", email: "eve@mail.com" },
  { id: 6, name: "EveA", email: "eve@maSAil.com" },
  { id: 7, name: "EveE", email: "eve@mSail.com" },
];

export default function UserPage() {
  const { table, globalFilter, setGlobalFilter } = useDataTable<User>({
    data,
    columns,
    pageSize: 5,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <DataTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
