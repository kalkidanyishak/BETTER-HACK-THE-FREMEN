import { FormItem } from "@/components/main/data-form";
import z from "zod";

export const userFields: FormItem[] = [
  "user",
  {
    type: "text",
    name: "username",
    placeholder: "Enter username",
    zodVal: z.string().min(3, "Username must be at least 3 characters"),
  },
  {
    type: "password",
    name: "password",
    placeholder: "Enter password",
    zodVal: z.string().min(6, "Password must be at least 6 characters"),
  }
];