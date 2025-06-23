import { Request, Response } from 'express';
import { itemsService } from '../services/items.service';
import { cleanInput } from '../utils/helpers';
import { renderHomeView } from '../views/home.view';
import { createBodySchema, apiCreateBodySchema, updateBodySchema, deleteBodySchema } from '../utils/validation';
import mongoose from 'mongoose';

// Web Handlers
export const home = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await itemsService.getAll();
    res.send(renderHomeView(items));
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const result = createBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0].message });
    return;
  }

  try {
    const safeText = cleanInput(result.data.text);
    const insertedId = await itemsService.create(safeText);
    res.json({ _id: insertedId.toString(), text: result.data.text });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const result = updateBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error.issues[0].message);
    return;
  }

  try {
    const objectId = new mongoose.Types.ObjectId(result.data.id);
    const safeText = cleanInput(result.data.text);
    await itemsService.update(objectId, safeText);
    res.send("Success");
  } catch (err) {
    res.status(500).send("Database error");
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const result = deleteBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error.issues[0].message);
    return;
  }

  try {
    const objectId = new mongoose.Types.ObjectId(result.data.id);
    await itemsService.delete(objectId);
    res.send("Success");
  } catch (err) {
    res.status(500).send("Database error");
  }
};

// API Handlers
export const apiViewListOfItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await itemsService.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

export const apiCreate = async (req: Request, res: Response): Promise<any> => {
  const result = apiCreateBodySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  try {
    const safeText = cleanInput(result.data.item);
    const insertedId = await itemsService.create(safeText);

    res.json({ 
      message: "Todo sucessfully added", 
      createItem: { id: insertedId.toString(), item: result.data.item } 
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

export const apiUpdate = async (req: Request, res: Response): Promise<void> => {
  const result = updateBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({ error: result.error.issues[0].message });
    return;
  }

  try {
    const objectId = new mongoose.Types.ObjectId(result.data.id);
    const safeText = cleanInput(result.data.text);
    await itemsService.update(objectId, safeText);
    res.send({
      message: "Todo successful updated",
      updatedId: { id: objectId.toString(), text: result.data.text }
    });
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
};

export const apiDelete = async (req: Request, res: Response): Promise<void> => {
  const result = deleteBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({ error: result.error.issues[0].message });
    return;
  }

  try {
    const objectId = new mongoose.Types.ObjectId(result.data.id);
    await itemsService.delete(objectId);
    res.send({ message: "Todo successfully deleted", deleteId: result.data.id });
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
};
