import labItem from "../models/labItem.js";
import Categories from '../models/labCategorySchemas/labCategories.js'
import mongoose from "mongoose";

export const fetchCategoryFields = async(req, res) => {
    try {
        const { category } = req.params;

        // const categoryModel = mongoose.model(category);
        // const schemaPaths = Object.keys(categoryModel.schema.paths);
        // res.status(200).json(schemaPaths);

        const Category = await Categories.find({ categoryName: category });
        let CategoryDefinition = Category.categoryDefinition;
        let attributes = [];
        for (let i = 0; i < CategoryDefinition.length; i++) {
          attributes.push(CategoryDefinition.name);
        }
        res.status(200).json(attributes);
    } catch (error) {
      console.log(error);  
    }
}

export const saveItem = async(req, res) => {

  try {
    const newItemData = req.body;

    const newItem = new labItem(newItemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

