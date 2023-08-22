import labCategory from "../models/labCategorySchemas/labCategories.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
    const { categoryName, categoryDefinition } = req.body;

    const newCategory = new labCategory({ categoryName, categoryDefinition});

    try {
        await newCategory.save();

        res.status(201).json(newCategory);

    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}