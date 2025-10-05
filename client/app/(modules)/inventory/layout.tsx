"use client"
import SidebarReuse from "@/components/main/data-sidebar";
import { Package, Tag, Truck, Building, Boxes, MoveRight, Home } from "lucide-react";
import React from "react"



export default function InventoryLayout({
        children,
}: {
        children: React.ReactNode
}) {


        const sidebarItems = [
                { icon: Home, label: "Home", href: "/dashboard" },
                { icon: Package, label: "Products", href: "/inventory/products" },
                { icon: Tag, label: "Categories", href: "/inventory/categories" },
                { icon: Truck, label: "Suppliers", href: "/inventory/supplier" },
                { icon: Building, label: "Warehouses", href: "/inventory/warehouse" },
                { icon: Boxes, label: "Stock", href: "/inventory/stock" },
                { icon: MoveRight, label: "Stock Movements", href: "/inventory/stock-movements" },
        ];

        return (
                <div className="flex h-screen w-screen overflow-hidden">
                        {/* Sidebar */}
                        <SidebarReuse items={sidebarItems} />

                        {/* Main content */}
                        <div className="flex flex-col flex-1">
                                {/* Header */}
                                <header className="h-14 border-b flex items-center px-4 bg-background">
                                        <h1 className="text-lg font-semibold">Inventory</h1>
                                </header>

                                {/* Page content */}
                                <main className="flex-1 overflow-y-auto p-4">{children}</main>
                        </div>
                </div>
        )
}
