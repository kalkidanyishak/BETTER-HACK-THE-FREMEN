"use client"
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem as ShadcnFormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";

import {  ZodType } from "zod";

type FieldType = {
  type: 'text' | 'password' | 'email' | 'number';
  name: string;
  placeholder?: string;
  zodVal: ZodType<any>;
};

export type FormItem = 'user' | FieldType;



interface CustomFormProps {
  fields: FormItem[];
  onSubmit: (data: any) => void;
}

export function CustomForm({ fields, onSubmit }: CustomFormProps) {
  // Build Zod schema dynamically
  const shape = {} as Record<string, ZodType<any>>;

  fields.forEach(field => {
    if (typeof field !== "string") {
      shape[field.name] = field.zodVal;
    }
  });

  const schema = z.object(shape);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      if (typeof field !== "string") acc[field.name] = "";
      return acc;
    }, {} as Record<string, any>)
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {fields.map((field, idx) => {
          if (typeof field === "string") return null; // handle other string types if needed

          return (
            <FormField
              key={idx}
              control={form.control}
              name={field.name}
              render={({ field: rhfField }) => (
                <ShadcnFormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input {...rhfField} placeholder={field.placeholder} type={field.type} />
                  </FormControl>
                  <FormMessage />
                </ShadcnFormItem>
              )}
            />
          );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
