"use client";


import { DataTable } from "@/components/main/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { api } from "@/lib/api";
import { userColumns } from "@/lib/table-config";
import { useQuery } from "@tanstack/react-query";

export default function UserPage() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api<User[]>('/users'),
  })

  const { table, globalFilter, setGlobalFilter } = useDataTable<User>({
    data: data || [],
    columns: userColumns,
    pageSize: 5,
  });

  if (isError) {
    return <div>Error loading users.</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

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


