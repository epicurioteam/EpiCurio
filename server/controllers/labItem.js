import labItem from "../models/labItem.js";
import mongoose from "mongoose";

// Category controllers
export const fetchCategoryFields = async (req, res) => {
  try {
    const { category } = req.params;

    const categoryModel = mongoose.model(category);
    const schemaPaths = Object.keys(categoryModel.schema.paths);
    res.status(200).json(schemaPaths);
  } catch (error) {
    console.log(error);
  }
};

// Item controllers
export const getItems = async (req, res) => {
  try {
    const items = await labItem.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await labItem.findById(id);

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveItem = async (req, res) => {
  try {
    const newItemData = req.body;

    console.log(newItemData);

    const itemModel = mongoose.model(newItemData.category);

    const newItem = new itemModel(newItemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No item with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}; */

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No item with id: ${id}`);

  await labItem.findByIdAndRemove(id);

  res.json({ message: "Item deleted successfully." });
};
