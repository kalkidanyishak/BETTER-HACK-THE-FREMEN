// src/lib/endpoint.ts
import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response } from "express";

const prisma = new PrismaClient();

/**
 * Create a generic router for any Prisma model.
 * @param modelName - prisma model name as the lowerCamelCase property of PrismaClient (e.g. "product", "employee", "customer")
 */
export function endpoint(modelName: string): Router {
  const router = Router();
  // @ts-ignore - dynamic access
  const model = (prisma as any)[modelName];

  // CREATE
  router.post("/", async (req: Request, res: Response) => {
    try {
      const created = await model.create({ data: req.body });
      res.status(201).json({ data: created });
    } catch (error: any) {
      if (error?.code === "P2002") {
        res.status(400).json({ error: "Unique constraint failed", meta: error.meta });
      } else {
        res.status(500).json({ error: error?.message || String(error) });
      }
    }
  });

  // READ ALL
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const list = await model.findMany();
      res.json({ data: list });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  // READ ONE
  router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const item = await model.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json({ data: item });
    } catch (error: any) {
      res.status(500).json({ error: error?.message || String(error) });
    }
  });

  // UPDATE
  router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const updated = await model.update({ where: { id }, data: req.body });
      res.json({ data: updated });
    } catch (error: any) {
      if (error?.code === "P2025") {
        res.status(404).json({ error: "Record not found" });
      } else {
        res.status(500).json({ error: error?.message || String(error) });
      }
    }
  });

  // DELETE
  router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      await model.delete({ where: { id } });
      res.json({ message: "Deleted successfully" });
    } catch (error: any) {
      if (error?.code === "P2025") {
        res.status(404).json({ error: "Record not found" });
      } else {
        res.status(500).json({ error: error?.message || String(error) });
      }
    }
  });

  return router;
}
