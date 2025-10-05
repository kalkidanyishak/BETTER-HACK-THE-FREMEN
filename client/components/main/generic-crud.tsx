// src/components/main/generic-crud-page.tsx
"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, PlusIcon, PlusSquareIcon, Trash2 } from "lucide-react";

import { MegaDialog } from "@/components/main/data-dialog";
import { CustomForm, FormItem } from "@/components/main/data-form";
import { DataTable } from "@/components/main/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { api } from "@/lib/api";

// Define the shape of the props for our reusable component
interface GenericCrudPageProps<TData extends { id: number | string }> {
  /** The key for react-query caching, e.g., ['users'] */
  queryKey: QueryKey;
  /** The base API route for the resource, e.g., '/users' */
  apiRoute: string;
  /** The configuration for the data table columns */
  tableConfig: ColumnDef<TData>[];
  /** The configuration for the create/edit form fields */
  formConfig: FormItem[];
  /** The main title for the page, e.g., "Users" */
  title: string;
  /** The singular name for an item, e.g., "User" */
  singularTitle: string;
}

/**
 * A reusable component for managing CRUD operations for a given resource.
 * It handles data fetching, table display, creation, updates, and deletion.
 */
export function GenericCrudPage<TData extends { id: number | string }>({
  queryKey,
  apiRoute,
  tableConfig,
  formConfig,
  title,
  singularTitle,
}: GenericCrudPageProps<TData>) {

  const queryClient = useQueryClient();

  // 1. Fetch Data (Read)
  const { data, isError, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => api.get<TData[]>(apiRoute),
  });

  // 2. Create Mutation
  const { mutate: create } = useMutation({
    mutationFn: (newItemData: Omit<TData, 'id'>) => api.post(apiRoute, newItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error(`Failed to create ${singularTitle}:`, error);
      // Optional: Add user feedback like a toast notification
    }
  });

  // 3. Update Mutation
  const { mutate: update } = useMutation({
    mutationFn: ({ id, updatedItemData }: { id: TData['id']; updatedItemData: Partial<TData> }) =>
      api.put(`${apiRoute}/${id}`, updatedItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error(`Failed to update ${singularTitle}:`, error);
    },
  });

  // 4. Delete Mutation
  const { mutate: remove } = useMutation({
    mutationFn: (id: TData['id']) => api.delete(`${apiRoute}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error(`Failed to delete ${singularTitle}:`, error);
    },
  });

  // 5. Define the "Actions" column dynamically
  const actionsColumn = useMemo<ColumnDef<TData>>(() => ({
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <MegaDialog 
              trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-blue-400 cursor-pointer"><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>}
              title={`Edit ${singularTitle}`}
            >
              {(close) => (
                <CustomForm
                  fields={formConfig}
                  initialData={item}
                  onSubmit={(data) => {
                    update({ id: item.id, updatedItemData: data });
                    close();
                  }}
                />
              )}
            </MegaDialog>
            <DropdownMenuItem className="text-red-400 cursor-pointer" onClick={() => remove(item.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }), [formConfig, singularTitle, update, remove]); // Dependencies for useMemo

  const columns = useMemo(() => [...tableConfig, actionsColumn], [tableConfig, actionsColumn]);
  
  // 6. Initialize DataTable
  const { table, globalFilter, setGlobalFilter } = useDataTable<TData>({
    data: data?.data || [],
    columns,
    pageSize: 5,
  });

  if (isError) return <div>Error loading {title.toLowerCase()}.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <MegaDialog
          trigger={<Button variant='outline' size="sm"><PlusSquareIcon/> {singularTitle}</Button>}
          title={`Add New ${singularTitle}`}
        >
          {(close) => (
            <CustomForm
              fields={formConfig}
              onSubmit={(formData) => {
                create(formData as Omit<TData, 'id'>);
                close();
              }}
            />
          )}
        </MegaDialog>
      </div>
      <DataTable
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}