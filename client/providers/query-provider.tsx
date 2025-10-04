"use client"
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

interface AppProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
