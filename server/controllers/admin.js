import labCategory from "../models/labCategorySchemas/labCategories.js";
import mongoose from "mongoose";
import parseAdminData from "./typeChecking/parseAdminData.js";
import labItem from "../models/labItem.js";
import Category from "../models/labCategorySchemas/labCategories.js";

export const createCategory = async (req, res) => {
  const { categoryName, categoryDefinition } = req.body;
  try {
//     const newCategory = new Category({
//         categoryName,
//         categoryDefinition: categoryDefinition,
//     });

//     let categorySchemaDefinition = parseAdminData(categoryDefinition);
//     labItem.discriminator(categoryName, mongoose.Schema(categorySchemaDefinition))

    const newCategory = new Category({ categoryName, categoryDefinition});

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error);
  }
};

export const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories.map((category) => category.categoryName));
  } catch (error) {
    console.log(error);
  }
};
