import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Import controllers
import * as inventoryController from "./src/controllers/inventoryController";
import * as hrController from "./src/controllers/hrController";
import * as customerController from "./src/controllers/customerController";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/* ===================== HEALTH CHECK & STATUS ===================== */
app.get("/", (req, res) => {
  res.json({
    message: "AutoERP API - BetterHack 2025",
    version: "1.0.0",
    status: "active",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    service: "AutoERP Backend",
    database: "Connected",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

/* ===================== CUSTOMERS ROUTES ===================== */
app.route("/api/customers")
  .post(customerController.createCustomer)
  .get(customerController.getCustomers);

app.route("/api/customers/:id")
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

/* ===================== HR MANAGEMENT ROUTES ===================== */

// Employees
app.route("/api/hr/employees")
  .post(hrController.createEmployee)
  .get(hrController.getEmployees);

app.route("/api/hr/employees/:id")
  .get(hrController.getEmployeeById)
  .put(hrController.updateEmployee)
  .delete(hrController.deleteEmployee);

// Departments
app.route("/api/hr/departments")
  .post(hrController.createDepartment)
  .get(hrController.getDepartments);

app.route("/api/hr/departments/:id")
  .get(hrController.getDepartmentById)
  .put(hrController.updateDepartment)
  .delete(hrController.deleteDepartment);

// Positions
app.route("/api/hr/positions")
  .post(hrController.createPosition)
  .get(hrController.getPositions);

app.route("/api/hr/positions/:id")
  .get(hrController.getPositionById)
  .put(hrController.updatePosition)
  .delete(hrController.deletePosition);

// Attendance
app.route("/api/hr/attendance")
  .post(hrController.createAttendance)
  .get(hrController.getAttendances);

app.route("/api/hr/attendance/:id")
  .get(hrController.getAttendanceById)
  .put(hrController.updateAttendance)
  .delete(hrController.deleteAttendance);

app.get("/api/hr/employees/:employeeId/attendance", hrController.getEmployeeAttendances);

// Leaves
app.route("/api/hr/leaves")
  .post(hrController.createLeave)
  .get(hrController.getLeaves);

app.route("/api/hr/leaves/:id")
  .get(hrController.getLeaveById)
  .put(hrController.updateLeave)
  .delete(hrController.deleteLeave);

app.get("/api/hr/employees/:employeeId/leaves", hrController.getEmployeeLeaves);
app.patch("/api/hr/leaves/:id/status", hrController.updateLeaveStatus);

// Payroll
app.route("/api/hr/payroll")
  .post(hrController.createPayroll)
  .get(hrController.getPayrolls);

app.route("/api/hr/payroll/:id")
  .get(hrController.getPayrollById)
  .put(hrController.updatePayroll)
  .delete(hrController.deletePayroll);

app.get("/api/hr/employees/:employeeId/payroll", hrController.getEmployeePayrolls);

// HR Dashboard & Analytics
app.get("/api/hr/dashboard", hrController.getHRDashboard);
app.get("/api/hr/employees/:employeeId/stats", hrController.getEmployeeStats);

/* ===================== INVENTORY MANAGEMENT ROUTES ===================== */

// Products
app.route("/api/inventory/products")
  .post(inventoryController.createProduct)
  .get(inventoryController.getProducts);

app.route("/api/inventory/products/:id")
  .get(inventoryController.getProductById)
  .put(inventoryController.updateProduct)
  .delete(inventoryController.deleteProduct);

app.get("/api/inventory/categories/:categoryId/products", inventoryController.getProductsByCategory);
app.get("/api/inventory/suppliers/:supplierId/products", inventoryController.getProductsBySupplier);

// Categories
app.route("/api/inventory/categories")
  .post(inventoryController.createCategory)
  .get(inventoryController.getCategories);

app.route("/api/inventory/categories/:id")
  .get(inventoryController.getCategoryById)
  .put(inventoryController.updateCategory)
  .delete(inventoryController.deleteCategory);

// Suppliers
app.route("/api/inventory/suppliers")
  .post(inventoryController.createSupplier)
  .get(inventoryController.getSuppliers);

app.route("/api/inventory/suppliers/:id")
  .get(inventoryController.getSupplierById)
  .put(inventoryController.updateSupplier)
  .delete(inventoryController.deleteSupplier);

// Warehouses
app.route("/api/inventory/warehouses")
  .post(inventoryController.createWarehouse)
  .get(inventoryController.getWarehouses);

app.route("/api/inventory/warehouses/:id")
  .get(inventoryController.getWarehouseById)
  .put(inventoryController.updateWarehouse)
  .delete(inventoryController.deleteWarehouse);

// Stock Management
app.route("/api/inventory/stock")
  .post(inventoryController.addStock)
  .get(inventoryController.getStock);

app.route("/api/inventory/stock/:id")
  .get(inventoryController.getStockById)
  .put(inventoryController.updateStock)
  .delete(inventoryController.deleteStock);

app.get("/api/inventory/products/:productId/stock", inventoryController.getStockByProduct);
app.get("/api/inventory/warehouses/:warehouseId/stock", inventoryController.getStockByWarehouse);

// Stock Movements
app.post("/api/inventory/stock/move", inventoryController.moveStock);
app.get("/api/inventory/movements", inventoryController.getStockMovements);
app.get("/api/inventory/movements/:id", inventoryController.getStockMovementById);
app.get("/api/inventory/stock/:stockId/movements", inventoryController.getMovementsByStock);
app.get("/api/inventory/products/:productId/movements", inventoryController.getMovementsByProduct);

// Inventory Dashboard & Analytics
app.get("/api/inventory/dashboard", inventoryController.getInventoryDashboard);
app.get("/api/inventory/analytics", inventoryController.getInventoryAnalytics);
app.get("/api/inventory/alerts/low-stock", inventoryController.getLowStockAlerts);

/* ===================== ERROR HANDLING ===================== */

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      customers: {
        base: "/api/customers",
        methods: ["GET", "POST"]
      },
      hr: {
        base: "/api/hr",
        modules: ["employees", "departments", "positions", "attendance", "leaves", "payroll", "dashboard"]
      },
      inventory: {
        base: "/api/inventory", 
        modules: ["products", "categories", "suppliers", "warehouses", "stock", "movements", "dashboard"]
      },
      status: "/api/status"
    }
  });
});

// Global Error Handling Middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global Error Handler:", error);

  // Prisma errors
  if (error.code?.startsWith('P')) {
    return res.status(400).json({
      error: "Database error",
      message: error.message,
      code: error.code
    });
  }

  // Default error response
  res.status(error.status || 500).json({
    error: error.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

/* ===================== SERVER STARTUP ===================== */

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start Server
app.listen(PORT, () => {
  console.log(`

                    🚀 AutoERP Server Started!               

  📍 Port: ${PORT}                                            
 🌐 Environment: ${process.env.NODE_ENV || 'development'}    
 📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'} 
 🕒 Time: ${new Date().toISOString()}                         
     Client URL  : http://localhost:${PORT}              

  `);
});

export default app;