import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ===================== INVENTORY HANDLERS ===================== */
export const getInventoryAnalytics = async (req: Request, res: Response) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalWarehouses,
      lowStockItems,
      recentMovements
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.supplier.count(),
      prisma.warehouse.count(),
      prisma.stock.findMany({
        where: { quantity: { lt: 10 } },
        include: { product: true, warehouse: true }
      }),
      prisma.stockMovement.findMany({
        include: {
          stock: { include: { product: true, warehouse: true } }
        },
        orderBy: { createdAt: "desc" },
        take: 10
      })
    ]);

    res.json({
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalWarehouses,
      lowStockItems,
      recentMovements
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInventoryDashboard = async (req: Request, res: Response) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalSuppliers,
      totalWarehouses,
      lowStockItems,
      totalStockValue,
      recentMovements
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.supplier.count(),
      prisma.warehouse.count(),
      prisma.stock.findMany({
        where: { quantity: { lt: 10 } },
        include: { product: true, warehouse: true }
      }),
      prisma.stock.findMany({
        include: { product: true }
      }).then(stocks =>
        stocks.reduce(
          (total, stock) => total + stock.quantity * stock.product.cost,
          0
        )
      ),
      prisma.stockMovement.findMany({
        include: {
          stock: { include: { product: true, warehouse: true } }
        },
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

    res.json({
      summary: {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalWarehouses,
        totalStockValue: Math.round(totalStockValue * 100) / 100
      },
      alerts: {
        lowStockCount: lowStockItems.length,
        lowStockItems: lowStockItems.slice(0, 5)
      },
      recentActivity: { recentMovements }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLowStockAlerts = async (req: Request, res: Response) => {
  try {
    const { threshold = "10" } = req.query;
    const minQuantity = parseInt(threshold as string);

    const lowStockItems = await prisma.stock.findMany({
      where: { quantity: { lt: minQuantity } },
      include: {
        product: { include: { category: true, supplier: true } },
        warehouse: true
      },
      orderBy: { quantity: "asc" }
    });

    res.json({
      threshold: minQuantity,
      count: lowStockItems.length,
      items: lowStockItems
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* ===================== HR HANDLERS ===================== */
export const getHRDashboard = async (req: Request, res: Response) => {
  try {
    const [
      totalEmployees,
      totalDepartments,
      totalPositions,
      pendingLeaves,
      recentAttendances,
      departmentStats
    ] = await Promise.all([
      prisma.employee.count(),
      prisma.department.count(),
      prisma.position.count(),
      prisma.leave.count({ where: { status: "PENDING" } }),
      prisma.attendance.findMany({
        include: {
          employee: { include: { department: true, position: true } }
        },
        orderBy: { date: "desc" },
        take: 10
      }),
      prisma.department.findMany({
        include: { _count: { select: { employees: true } } }
      })
    ]);

    const payrollSummary = await prisma.payroll.aggregate({
      _sum: {
        baseSalary: true,
        bonus: true,
        deductions: true,
        netSalary: true
      },
      where: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }
    });

    res.json({
      summary: {
        totalEmployees,
        totalDepartments,
        totalPositions,
        pendingLeaves
      },
      payroll: payrollSummary._sum,
      departments: departmentStats.map(dept => ({
        name: dept.name,
        employeeCount: dept._count.employees
      })),
      recentActivity: { recentAttendances }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeStats = async (req: Request, res: Response) => {
  try {
    const employeeId = parseInt(req.params.id);

    const [
      employee,
      attendanceCount,
      leaveCount,
      payrollCount,
      recentLeaves,
      recentPayrolls
    ] = await Promise.all([
      prisma.employee.findUnique({
        where: { id: employeeId },
        include: { department: true, position: true }
      }),
      prisma.attendance.count({ where: { employeeId } }),
      prisma.leave.count({ where: { employeeId } }),
      prisma.payroll.count({ where: { employeeId } }),
      prisma.leave.findMany({
        where: { employeeId },
        orderBy: { startDate: "desc" },
        take: 5
      }),
      prisma.payroll.findMany({
        where: { employeeId },
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

    if (!employee) return res.status(404).json({ error: "Employee not found" });

    res.json({
      employee,
      stats: {
        totalAttendances: attendanceCount,
        totalLeaves: leaveCount,
        totalPayrolls: payrollCount
      },
      recentLeaves,
      recentPayrolls
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentOverview = async (req: Request, res: Response) => {
  try {
    const departmentId = parseInt(req.params.id);

    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        employees: {
          include: {
            position: true,
            attendances: { orderBy: { date: "desc" }, take: 5 },
            leaves: { where: { status: "PENDING" } }
          }
        }
      }
    });

    if (!department) return res.status(404).json({ error: "Department not found" });

    const stats = {
      totalEmployees: department.employees.length,
      pendingLeaves: department.employees.reduce(
        (sum, emp) => sum + emp.leaves.length,
        0
      ),
      averageSalary:
        department.employees.length > 0
          ? department.employees.reduce((sum, emp) => sum + emp.salary, 0) /
            department.employees.length
          : 0
    };

    res.json({
      department,
      stats,
      employees: department.employees
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
