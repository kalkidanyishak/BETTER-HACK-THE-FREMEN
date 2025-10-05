import { FormItem } from "@/components/main/data-form";
import { z } from "zod";

// Assuming a type definition like this exists

export const customerFields: FormItem[] = [
  "customer",
  {
    type: "text",
    name: "firstName",
    placeholder: "Enter first name",
    zodVal: z.string().min(1, "First name is required"),
  },
  {
    type: "text",
    name: "lastName",
    placeholder: "Enter last name",
    zodVal: z.string().min(1, "Last name is required"),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter email address",
    zodVal: z.string().email("Invalid email address"),
  },
  {
    type: "text",
    name: "phone",
    placeholder: "Enter phone number (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "text",
    name: "company",
    placeholder: "Enter company name (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "text",
    name: "isActive",
    placeholder: "Customer is active",
    zodVal: z.boolean().default(true),
  },
];

export const contactFields: FormItem[] = [
  "contact",
  {
    type: "select",
    name: "customerId",
    placeholder: "Select a customer",
    zodVal: z.coerce.number().int().positive("A customer must be selected"),
  },
  {
    type: "text",
    name: "name",
    placeholder: "Enter contact's full name",
    zodVal: z.string().min(1, "Name is required"),
  },
  {
    type: "text",
    name: "title",
    placeholder: "Enter job title (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter email address (optional)",
    zodVal: z.string().email("Invalid email address").optional().or(z.literal("")),
  },
  {
    type: "text",
    name: "phone",
    placeholder: "Enter phone number (optional)",
    zodVal: z.string().optional(),
  },
];

export const opportunityFields: FormItem[] = [
  "opportunity",
  {
    type: "select",
    name: "customerId",
    placeholder: "Select a customer",
    zodVal: z.coerce.number().int().positive("A customer must be selected"),
  },
  {
    type: "text",
    name: "title",
    placeholder: "Enter opportunity title",
    zodVal: z.string().min(1, "Title is required"),
  },
  {
    type: "number",
    name: "amount",
    placeholder: "Enter opportunity amount",
    zodVal: z.coerce.number().positive("Amount must be a positive number"),
  },
  {
    type: "select",
    name: "stage",
    placeholder: "Select opportunity stage",
    zodVal: z.enum(["LEAD", "QUALIFIED", "PROPOSAL", "WON", "LOST"]),
  },
  {
    type: "date",
    name: "expectedClose",
    placeholder: "Select expected close date (optional)",
    zodVal: z.date().optional(),
  },
];

export const interactionFields: FormItem[] = [
  "interaction",
  {
    type: "select",
    name: "customerId",
    placeholder: "Select a customer",
    zodVal: z.coerce.number().int().positive("A customer must be selected"),
  },
  {
    type: "select",
    name: "contactId",
    placeholder: "Select a contact (optional)",
    zodVal: z.coerce.number().int().positive().optional(),
  },
  {
    type: "select",
    name: "type",
    placeholder: "Select interaction type",
    zodVal: z.enum(["CALL", "EMAIL", "MEETING", "OTHER"]),
  },
  {
    type: "text",
    name: "subject",
    placeholder: "Enter subject (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "textarea",
    name: "notes",
    placeholder: "Enter notes (optional)",
    zodVal: z.string().optional(),
  },
  {
    type: "date",
    name: "occurredAt",
    placeholder: "Select when the interaction occurred",
    zodVal: z.date(),
  },
];