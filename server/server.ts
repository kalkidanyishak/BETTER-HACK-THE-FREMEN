import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// GET all customers
app.get("/api/customers", async (_req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json({ data: customers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// GET customer by ID
app.get("/api/customers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json({ data: customer });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// CREATE a customer
app.post("/api/customers", async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, isActive } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        isActive,
      },
    });
    res.status(201).json({ data: newCustomer });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to create customer" });
    }
  }
});

// UPDATE a customer
app.put("/api/customers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { firstName, lastName, email, phone, isActive } = req.body;
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { firstName, lastName, email, phone, isActive },
    });
    res.json({ data: updatedCustomer });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(500).json({ error: "Failed to update customer" });
    }
  }
});

// DELETE a customer
app.delete("/api/customers/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.customer.delete({ where: { id } });
    res.json({ message: "Customer deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(500).json({ error: "Failed to delete customer" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
