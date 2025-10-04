// hooks/useDataTable.ts (Corrected)
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  PaginationState, // 🔹 Import PaginationState
} from "@tanstack/react-table";
import { useState } from "react";

export function useDataTable<TData>({
  data,
  columns,
  pageSize = 10,
}: {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pageSize?: number;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // 🔹 1. Manage the entire pagination object in state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination, // 🔹 3. Use the new pagination state object
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // 🔹 2. Add the handler to update your state
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // You can simplify the return value as the component only needs the table instance
  // and the global filter state.
  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
}