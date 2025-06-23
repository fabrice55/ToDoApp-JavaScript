import { Item } from '../models/item.model';
import mongoose from 'mongoose';

export const itemsService = {
  async getAll() {
    return Item.find().lean();
  },

  async create(text: string): Promise<mongoose.Types.ObjectId> {
    const item = new Item({ text });
    await item.save();
    return item._id;
  },

  async update(id: mongoose.Types.ObjectId, text: string) {
    return Item.findOneAndUpdate(
      { _id: id },
      { $set: { text } },
      { new: true }
    );
  },

  async delete(id: mongoose.Types.ObjectId) {
    return Item.deleteOne({ _id: id });
  }
};
