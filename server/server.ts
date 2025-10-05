// src/core/server.ts
import express from "express";
import cors from "cors";
import { endpoint } from "./lib/endpoints";
import {
  getInventoryAnalytics,
  getInventoryDashboard,
  getLowStockAlerts,
  getHRDashboard,
  getEmployeeStats,
  getDepartmentOverview
} from "./lib/customEndpoints";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Inventory Endpoints
app.use("/api/products", endpoint("product"));
app.use("/api/categories", endpoint("category"));
app.use("/api/suppliers", endpoint("supplier"));
app.use("/api/warehouses", endpoint("warehouse"));
app.use("/api/stocks", endpoint("stock"));
app.use("/api/stock-movements", endpoint("stockMovement"));

// HR Endpoints
app.use("/api/employees", endpoint("employee"));
app.use("/api/departments", endpoint("department"));
app.use("/api/positions", endpoint("position"));
app.use("/api/attendances", endpoint("attendance"));
app.use("/api/leaves", endpoint("leave"));
app.use("/api/payrolls", endpoint("payroll"));

// CRM Endpoints
app.use("/api/customers", endpoint("customer"));
app.use("/api/contacts", endpoint("contact"));
app.use("/api/opportunities", endpoint("opportunity"));
app.use("/api/interactions", endpoint("interaction"));

// Custom Analytics Endpoints
/* ===================== INVENTORY ROUTES ===================== */
app.get("/api/inventory/analytics", getInventoryAnalytics);
app.get("/api/inventory/dashboard", getInventoryDashboard);
app.get("/api/inventory/alerts/low-stock", getLowStockAlerts);

/* ===================== HR ROUTES ===================== */
app.get("/api/hr/dashboard", getHRDashboard);
app.get("/api/hr/employees/:id/stats", getEmployeeStats);
app.get("/api/hr/departments/:id/overview", getDepartmentOverview);

// Health Check
app.get("/", (_req, res) => res.json({ 
  message: "AutoERP API running",
  version: "1.0.0",
  timestamp: new Date().toISOString()
}));

// API Status
app.get("/api/status", (_req, res) => res.json({
  status: "OK",
  database: "Connected",
  environment: process.env.NODE_ENV || "development"
}));


app.listen(PORT, () => {
  console.log(`🚀 AutoERP Server running on http://localhost:${PORT}`);
});
