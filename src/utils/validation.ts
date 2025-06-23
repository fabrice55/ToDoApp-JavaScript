import { z } from 'zod';

export const idSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
  message: "Invalid MongoDB ObjectId"
});

export const itemTextSchema = z.string().trim().min(1, "Text must not be empty");

export const createBodySchema = z.object({
  text: itemTextSchema
});

export const apiCreateBodySchema = z.object({
  item: itemTextSchema
});

export const updateBodySchema = z.object({
  id: idSchema,
  text: itemTextSchema
});

export const deleteBodySchema = z.object({
  id: idSchema
});
