"use client"

import SidebarReuse from "@/components/main/data-sidebar"
import {
  Users,
  User,
  ClipboardList,
  CalendarCheck,
  Home,
  PhoneCall,
  Mail,
} from "lucide-react"
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
    { icon: PhoneCall, label: "Calls", href: "/crm/calls" },
    { icon: Mail, label: "Emails", href: "/crm/emails" },
  ]

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <SidebarReuse
        items={sidebarItems}
        className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 shadow-lg"
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white shadow-md border-b">
          <h1 className="text-2xl font-bold text-slate-800 tracking-wide">CRM</h1>

          {/* Optional header actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <PhoneCall className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <Mail className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <User className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  )
}
