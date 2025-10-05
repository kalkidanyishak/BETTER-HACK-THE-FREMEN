import { ColumnDef } from "@tanstack/react-table";

// --- Assumed Prisma-generated types ---
// These types would typically be imported from your Prisma Client.
// e.g., import { Product, Category, Supplier } from "@prisma/client";

type Product = {
  id: number;
  name: string;
  sku: string;
  price: number;
  category: { name: string };
  supplier: { name: string };
};

type Category = {
  id: number;
  name: string;
};

type Supplier = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
};

type Warehouse = {
  id: number;
  name: string;
  location?: string | null;
};

type Stock = {
  id: number;
  quantity: number;
  product: { name: string };
  warehouse: { name: string };
};

type StockMovement = {
  id: number;
  type: "IN" | "OUT";
  quantity: number;
  createdAt: Date;
  stock: {
    product: { name: string };
    warehouse: { name: string };
  };
};

// --- Column Definitions ---

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
//   {
//     accessorFn: (row) => row.category.name,
//     id: "category",
//     header: "Category",
//   },
//   {
//     accessorFn: (row) => row.supplier.name,
//     id: "supplier",
//     header: "Supplier",
//   },
];

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
];

export const supplierColumns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];

export const warehouseColumns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: "name",
    header: "Warehouse Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];

export const stockColumns: ColumnDef<Stock>[] = [
//   {
//     accessorFn: (row) => row.product.name,
//     id: "product",
//     header: "Product",
//   },
//   {
//     accessorFn: (row) => row.warehouse.name,
//     id: "warehouse",
//     header: "Warehouse",
//   },
  {
    accessorKey: "quantity",
    header: "Quantity on Hand",
  },
];

export const stockMovementColumns: ColumnDef<StockMovement>[] = [
//   {
//     accessorFn: (row) => row.stock.product.name,
//     id: "product",
//     header: "Product",
//   },
//   {
//     accessorFn: (row) => row.stock.warehouse.name,
//     id: "warehouse",
//     header: "Warehouse",
//   },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity Moved",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    // You would typically format this value in the cell component
    // cell: ({ info }) => new Date(info.getValue()).toLocaleDateString(),
  },
];