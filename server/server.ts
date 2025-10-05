// src/core/server.ts
import express from "express";
import cors from "cors";
import { endpoint } from "./lib/endpoints";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Inventory
app.use("/api/products", endpoint("product"));
app.use("/api/categories", endpoint("category"));
app.use("/api/suppliers", endpoint("supplier"));
app.use("/api/warehouses", endpoint("warehouse"));
app.use("/api/stocks", endpoint("stock"));
app.use("/api/stock-movements", endpoint("stockMovement")); // prisma camelCase: stockMovement

// HR
app.use("/api/employees", endpoint("employee"));
app.use("/api/departments", endpoint("department"));
app.use("/api/positions", endpoint("position"));
app.use("/api/attendances", endpoint("attendance"));
app.use("/api/leaves", endpoint("leave"));
app.use("/api/payrolls", endpoint("payroll"));

// CRM
app.use("/api/customers", endpoint("customer"));
app.use("/api/contacts", endpoint("contact"));
app.use("/api/opportunities", endpoint("opportunity"));
app.use("/api/interactions", endpoint("interaction"));

app.get("/", (_req, res) => res.json({ message: "AutoERP API running" }));

app.listen(PORT, () => {
  console.log(`🚀 AutoERP Server running on http://localhost:${PORT}`);
});
