import labCategory from "../models/labCategorySchemas/labCategories.js";
import mongoose from "mongoose";
import parseAdminData from "./typeChecking/parseAdminData.js";
import labItem from "../models/labItem.js";
import Category from "../models/labCategorySchemas/labCategories.js";

export const createCategory = async (req, res) => {
  const { categoryName, categoryDefinition } = req.body;

  // Convert the categoryDefinition object to a schema definition
  const schemaDefinition = {};
  for (const [key, value] of Object.entries(categoryDefinition)) {
    schemaDefinition[key] = mongoose.SchemaTypes[value];
  }

  // Create a new schema and model with this definition
  const categorySchema = new mongoose.Schema(schemaDefinition);
  mongoose.model(categoryName, categorySchema);

  // Store the category name and definition as before
  const newCategory = new Category({ categoryName, categoryDefinition });
  await newCategory.save();

  res.status(201).json(newCategory);
};
/* 
export const createCategory = async (req, res) => {
  const { categoryName, categoryDefinition } = req.body;
  try {
    const newCategory = new Category({
      categoryName,
      categoryDefinition: categoryDefinition,
    });

    let categorySchemaDefinition = parseAdminData(categoryDefinition);
    labItem.discriminator(
      categoryName,
      mongoose.Schema(categorySchemaDefinition)
    );

    await newCategory.save();

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error);
  }
}; */

export const fetchCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({ categoryName: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* export const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories.map((category) => category.categoryName));
  } catch (error) {
    console.log(error);
  }
}; */
