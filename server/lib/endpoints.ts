// src/lib/endpoint.ts
import { PrismaClient } from "@prisma/client";
import { Router, type Request, type Response } from "express";
import { inventoryIncludes } from "./includes/inventoryIncludes";
import { hrIncludes } from "./includes/hrIncludes";
import { crmIncludes } from "./includes/crmIncludes";

const prisma = new PrismaClient();

// Merge all includes
const allIncludes = {
  ...inventoryIncludes,
  ...hrIncludes,
  ...crmIncludes
};

/**
 * Create a generic router for any Prisma model with automatic includes
 */
export function endpoint(modelName: string): Router {
  const router = Router();
  // @ts-ignore - dynamic access
  const model = (prisma as any)[modelName];
  
  // Get includes for this model
  const modelIncludes = (allIncludes as any)[modelName];

  // CREATE
  router.post("/", async (req: Request, res: Response) => {
    try {
      const created = await model.create({ 
        data: req.body,
        include: modelIncludes?.include 
      });
      res.status(201).json({ data: created });
    } catch (error: any) {
      if (error?.code === "P2002") {
        res.status(400).json({ 
          error: "Unique constraint failed", 
          meta: error.meta 
        });
      } else {
        res.status(500).json({ 
          error: error?.message || String(error) 
        });
      }
    }
  });

  // READ ALL
  router.get("/", async (req: Request, res: Response) => {
    try {
      const { include } = req.query;
      
      let findManyOptions: any = {};
      
      // Use predefined includes or custom includes from query
      if (include === 'true' && modelIncludes) {
        findManyOptions.include = modelIncludes.include;
      }
      
      const list = await model.findMany(findManyOptions);
      res.json({ data: list });
    } catch (error: any) {
      res.status(500).json({ 
        error: error?.message || String(error) 
      });
    }
  });

  // READ ONE
  router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { include } = req.query;
    
    try {
      let findOptions: any = { where: { id } };
      
      // Use predefined includes or custom includes from query
      if (include === 'true' && modelIncludes) {
        findOptions.include = modelIncludes.include;
      }
      
      const item = await model.findUnique(findOptions);
      
      if (!item) {
        return res.status(404).json({ 
          error: `${modelName} not found` 
        });
      }
      
      res.json({ data: item });
    } catch (error: any) {
      res.status(500).json({ 
        error: error?.message || String(error) 
      });
    }
  });

  // UPDATE
  router.put("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { include } = req.query;
    
    try {
      let updateOptions: any = { 
        where: { id }, 
        data: req.body 
      };
      
      // Use predefined includes or custom includes from query
      if (include === 'true' && modelIncludes) {
        updateOptions.include = modelIncludes.include;
      }
      
      const updated = await model.update(updateOptions);
      res.json({ data: updated });
    } catch (error: any) {
      if (error?.code === "P2025") {
        res.status(404).json({ 
          error: `${modelName} not found` 
        });
      } else {
        res.status(500).json({ 
          error: error?.message || String(error) 
        });
      }
    }
  });

  // DELETE
  router.delete("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      await model.delete({ where: { id } });
      res.json({ 
        message: `${modelName} deleted successfully` 
      });
    } catch (error: any) {
      if (error?.code === "P2025") {
        res.status(404).json({ 
          error: `${modelName} not found` 
        });
      } else {
        res.status(500).json({ 
          error: error?.message || String(error) 
        });
      }
    }
  });

  return router;
}