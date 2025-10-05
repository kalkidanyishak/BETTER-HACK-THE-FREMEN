"use client"
import SidebarReuse from "@/components/main/data-sidebar";
import { Users, User, ClipboardList, PhoneCall, Mail, CalendarCheck, Home } from "lucide-react";
import React from "react"



export default function CMSLayout({
        children,
}: {
        children: React.ReactNode
}) {


        const sidebarItems = [
                { icon: Home, label: "Home", href: "/dashboard" },
                { icon: Users, label: "Customers", href: "/crm/customers" },
                { icon: User, label: "Contacts", href: "/crm/contacts" },
                { icon: ClipboardList, label: "Opportunities", href: "/crm/opportunities" },
                { icon: CalendarCheck, label: "Interactions", href: "/crm/interactions" },
        ];


        return (
                <div className="flex h-screen w-screen overflow-hidden">
                        {/* Sidebar */}
                        <SidebarReuse items={sidebarItems} />

                        {/* Main content */}
                        <div className="flex flex-col flex-1">
                                {/* Header */}
                                <header className="h-14 border-b flex items-center px-4 bg-background">
                                        <h1 className="text-lg font-semibold">CRM</h1>
                                </header>

                                {/* Page content */}
                                <main className="flex-1 overflow-y-auto p-4">{children}</main>
                        </div>
                </div>
        )
}
