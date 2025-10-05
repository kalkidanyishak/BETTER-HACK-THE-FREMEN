"use client"
import SidebarReuse from "@/components/main/data-sidebar";
import { Users, Building, Briefcase, CalendarCheck, Plane, Wallet } from "lucide-react";
import React from "react"



export default function HRLayout({
        children,
}: {
        children: React.ReactNode
}) {


        const sidebarItems = [
                { icon: Users, label: "Employees", href: "/hr/employee" },
                { icon: Building, label: "Departments", href: "/hr/department" },
                { icon: Briefcase, label: "Positions", href: "/hr/positions" },
                { icon: CalendarCheck, label: "Attendances", href: "/hr/attendance" },
                { icon: Plane, label: "Leaves", href: "/hr/leaves" },
                { icon: Wallet, label: "Payrolls", href: "/hr/payrolls" },
        ];


        return (
                <div className="flex h-screen w-screen overflow-hidden">
                        {/* Sidebar */}
                        <SidebarReuse items={sidebarItems} />

                        {/* Main content */}
                        <div className="flex flex-col flex-1">
                                {/* Header */}
                                <header className="h-14 border-b flex items-center px-4 bg-background">
                                        <h1 className="text-lg font-semibold">HR</h1>
                                </header>

                                {/* Page content */}
                                <main className="flex-1 overflow-y-auto p-4">{children}</main>
                        </div>
                </div>
        )
}
