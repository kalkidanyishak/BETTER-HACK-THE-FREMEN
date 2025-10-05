import { FormItem } from "@/components/main/data-form";
import z from "zod";

export const userFields: FormItem[] = [
  "user",
  {
    type: "text",
    name: "firstName",
    placeholder: "Enter name",
    zodVal: z.string().min(3, "Name must be at least 3 characters"),
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter email",
    zodVal: z.string().min(6, "Email must be at least 6 characters"),
  }
];

