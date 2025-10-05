"use client"

import * as React from "react"
import { Home, Users, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function Sidebar() {
  return (
    <div className="flex">
      {/* Mobile toggle */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarNav />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 h-screen border-r bg-muted/40">
        <SidebarNav />
      </div>
    </div>
  )
}

function SidebarNav() {
  const items = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Users, label: "HR", href: "/HR/dashboard" },
    { icon: Settings, label: "IMS", href: "/IMS/dashboard" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ]

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-2 p-4">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </a>
        ))}
      </div>
    </ScrollArea>
  )
}
