"use client";

import {
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import { clsx } from "clsx";
import { title } from "process";

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
          <Input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            className="max-w-sm p-4"
          />
        </div>
      )}

      {/* 🔹 Table */}
      <div className="rounded-md border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "px-4 py-3 text-left font-medium text-sm text-muted-foreground border-b",
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
          <tbody className="bg-card">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={clsx(
                    "border-b transition-colors hover:bg-muted/50",
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={clsx(
                        "px-4 py-3 text-sm align-top",
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
                  className="h-24 text-center py-4 text-muted-foreground"
                >
                  No results found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            of <span className="font-medium">{table.getFilteredRowModel().rows.length} results</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onMouseDown={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Go to first page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onMouseDown={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Go to previous page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onMouseDown={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Go to next page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onMouseDown={() =>
                table.setPageIndex(table.getPageCount() - 1)
              }
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
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