import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/* ----------------------------- BASIC ROUTES ----------------------------- */
app.get("/", (req , res) => {
  res.send("AutoERP API - BetterHack 2025 is alive!");
});

/* ----------------------------- USER CRUD ----------------------------- */
app.post("/api/v1/users", async (req, res) => {
    console.log("Incoming body:", req.body);
  try {
    const user = await prisma.User.create({ data: req.body });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/api/v1/users", async (_req, res) => {
  const users = await prisma.User.findMany();
  res.json(users);
});


/* ----------------------------- PRODUCT CRUD ----------------------------- */
app.post("/api/v1/products", async (req, res) => {
  try {
    const product = await prisma.Product.create({ data: req.body });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/api/v1/products", async (_req, res) => {
  const products = await prisma.Product.findMany({ include: { currency: true } });
  res.json(products);
});

app.put("/api/v1/products/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updated = await prisma.Product.update({ where: { id }, data });
  res.json(updated);
});

app.delete("/api/v1/products/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.Product.delete({ where: { id } });
  res.status(204).send();
});


/* ----------------------------- SERVER ----------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 AutoERP server running on http://localhost:${PORT}`);
});
