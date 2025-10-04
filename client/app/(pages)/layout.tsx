import React from "react"
import { Sidebar } from "@/components/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-14 border-b flex items-center px-4 bg-background">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
