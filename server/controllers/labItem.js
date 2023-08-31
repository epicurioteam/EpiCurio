import labItem from "../models/labItem.js";
import mongoose from "mongoose";

export const fetchCategoryFields = async(req, res) => {
    try {
        const { category } = req.params;

        const categoryModel = mongoose.model(category);
        const schemaPaths = Object.keys(categoryModel.schema.paths);
        res.status(200).json(schemaPaths);
    } catch (error) {
      console.log(error);  
    }
}

export const saveItem = async(req, res) => {

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
}

