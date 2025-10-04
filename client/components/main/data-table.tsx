"use client";

import {
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  searchable?: boolean;
}

export function DataTable<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  searchable = true,
}: DataTableProps<TData>) {
  const pageInfo = useMemo(
    () => ({
      current: table.getState().pagination.pageIndex + 1,
      total: table.getPageCount(),
    }),
    [table]
  );

  return (
    <div className="space-y-6">
      {/* 🔍 Search Input */}
      {searchable && (
        <div className="flex items-center justify-between">
          <Input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search records..."
            className="max-w-sm border-muted-foreground/30 focus:ring-2 focus:ring-primary transition-all"
          />
          <div className="text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} results
          </div>
        </div>
      )}

      {/* 📋 Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/60">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-4 py-3 text-left font-medium text-muted-foreground border-b",
                      "text-[13px] uppercase tracking-wide"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors hover:bg-muted/50",
                    "border-b last:border-none"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-foreground/90"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="text-center py-8 text-sm text-muted-foreground"
                >
                  No results found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Page <span className="font-medium text-foreground">{pageInfo.current}</span> of{" "}
          <span className="font-medium text-foreground">{pageInfo.total}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            ⏮️
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            ◀️
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8"
          >
            ▶️
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
            className="h-8 w-8"
          >
            ⏭️
          </Button>
        </div>
      </div>
    </div>
  );
}
