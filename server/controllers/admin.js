import labCategory from "../models/labCategorySchemas/labCategories.js";
import mongoose from "mongoose";
import parseAdminData from "./typeChecking/parseAdminData.js";

export const createCategory = async (req, res) => {
    const { categoryName, categoryDefinition } = req.body;
    let categorySchema = parseAdminData(categoryDefinition);

    try {
        res.status(200).json(categorySchema);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}