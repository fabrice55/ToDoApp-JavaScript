import { Schema, model } from 'mongoose';

export interface IItem {
  text: string;
}

const itemSchema = new Schema<IItem>({
  text: { type: String, required: true }
}, {
  versionKey: false
});

export const Item = model<IItem>('Item', itemSchema);
