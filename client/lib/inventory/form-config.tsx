import { FormItem } from "@/components/main/data-form";
import z from "zod";

export const productFields: FormItem[] = [
  "product",
  {
    type: "text",
    name: "name",
    placeholder: "Enter product name",
    zodVal: z.string().min(3, "Name must be at least 3 characters"),
  },
  {
    type: "text",
    name: "sku",
    placeholder: "Enter SKU (Stock Keeping Unit)",
    zodVal: z.string().min(3, "SKU must be at least 3 characters"),
  },
  {
    type: "textarea",
    name: "description",
    placeholder: "Enter product description (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "select",
    name: "categoryId",
    placeholder: "Select a category",
    zodVal: z.coerce.number().int().positive("A category must be selected"),
  },
  {
    type: "select",
    name: "supplierId",
    placeholder: "Select a supplier",
    zodVal: z.coerce.number().int().positive("A supplier must be selected"),
  },
  {
    type: "number",
    name: "price",
    placeholder: "Enter price",
    zodVal: z.coerce.number().positive("Price must be a positive number"),
  },
  {
    type: "number",
    name: "cost",
    placeholder: "Enter cost",
    zodVal: z.coerce.number().positive("Cost must be a positive number"),
  },
];

// --- Category ---
export const categoryFields: FormItem[] = [
  "category",
  {
    type: "text",
    name: "name",
    placeholder: "Enter category name",
    zodVal: z.string().min(2, "Category name must be at least 2 characters"),
  },
];

// --- Supplier ---
export const supplierFields: FormItem[] = [
  "supplier",
  {
    type: "text",
    name: "name",
    placeholder: "Enter supplier name",
    zodVal: z.string().min(3, "Supplier name must be at least 3 characters"),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter email (optional)",
    zodVal: z.string().email("Invalid email address").optional().or(z.literal('')),
  },
  {
    type: "tel",
    name: "phone",
    placeholder: "Enter phone number (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "textarea",
    name: "address",
    placeholder: "Enter address (optional)",
    zodVal: z.string().optional(),
  },
];

// --- Warehouse ---
export const warehouseFields: FormItem[] = [
  "warehouse",
  {
    type: "text",
    name: "name",
    placeholder: "Enter warehouse name",
    zodVal: z.string().min(3, "Warehouse name must be at least 3 characters"),
  },
  {
    type: "text",
    name: "location",
    placeholder: "Enter location (optional)",
    zodVal: z.string().optional(),
  },
];

// --- Stock ---
// This form might be part of a larger "Add Inventory" flow
export const stockFields: FormItem[] = [
  "stock",
  {
    type: "select",
    name: "productId",
    placeholder: "Select a product",
    zodVal: z.coerce.number().int().positive("A product must be selected"),
  },
  {
    type: "select",
    name: "warehouseId",
    placeholder: "Select a warehouse",
    zodVal: z.coerce.number().int().positive("A warehouse must be selected"),
  },
  {
    type: "number",
    name: "quantity",
    placeholder: "Enter initial quantity",
    zodVal: z.coerce.number().int().min(0, "Quantity cannot be negative"),
  },
];

// --- Stock Movement ---
// This form is for recording a movement, like receiving or shipping stock
export const stockMovementFields: FormItem[] = [
  "stockMovement",
  {
    type: "select",
    name: "stockId",
    placeholder: "Select stock item (Product at Warehouse)",
    zodVal: z.coerce.number().int().positive("A stock item must be selected"),
  },
  {
    type: "select",
    name: "type",
    placeholder: "Select movement type",
    zodVal: z.enum(["IN", "OUT"]),
  },
  {
    type: "number",
    name: "quantity",
    placeholder: "Enter quantity to move",
    zodVal: z.coerce.number().int().positive("Quantity must be a positive number"),
  },
];