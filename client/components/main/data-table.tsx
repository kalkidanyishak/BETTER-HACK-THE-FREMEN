"use client";

import {
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, Search } from "lucide-react";
import { clsx } from "clsx";
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
        <div className="flex justify-center items-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="w-full pl-10 pr-4 py-3 bg-background border-border rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      )}

      {/* 🔹 Table */}
      <div className="rounded-xl border border-border shadow-sm overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className={clsx(
                        "px-6 py-4 text-left font-semibold text-sm text-muted-foreground border-b border-border",
                        header.id === "actions" && "max-w-[100px] w-[100px]"
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
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={clsx(
                      "transition-all duration-200 hover:bg-muted/50",
                      index % 2 === 0 ? "bg-background" : "bg-muted/5"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={clsx(
                          "px-6 py-4 text-sm align-top font-medium text-foreground",
                          cell.column.id === "actions" && "max-w-[50px] w-[50px]"
                        )}
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
                    className="h-32 text-center py-8 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="h-8 w-8 text-muted-foreground/50" />
                      <span className="text-lg font-medium">No results found</span>
                      <span className="text-sm">Try adjusting your search or filters</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            of <span className="font-semibold text-foreground">{table.getFilteredRowModel().rows.length} results</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-9 w-9 p-0 border-border hover:bg-muted rounded-lg shadow-sm"
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Go to first page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-9 w-9 p-0 border-border hover:bg-muted rounded-lg shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Go to previous page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-9 w-9 p-0 border-border hover:bg-muted rounded-lg shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Go to next page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                table.setPageIndex(table.getPageCount() - 1)
              }
              disabled={!table.getCanNextPage()}
              className="h-9 w-9 p-0 border-border hover:bg-muted rounded-lg shadow-sm"
            >
              <SkipForward className="h-4 w-4" />
              <span className="sr-only">Go to last page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}