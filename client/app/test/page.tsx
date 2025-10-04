"use client";


import { DataTable } from "@/components/main/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { tableColumns } from "@/lib/table-config";
import { useQuery } from "@tanstack/react-query";




export default function UserPage() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  })

  const { table, globalFilter, setGlobalFilter } = useDataTable<User>({
    data,
    columns: tableColumns,
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
