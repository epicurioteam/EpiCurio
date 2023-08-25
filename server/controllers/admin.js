import labCategory from "../models/labCategorySchemas/labCategories.js";
import mongoose from "mongoose";
import parseAdminData from "./typeChecking/parseAdminData.js";
import labItem from "../models/labItem.js";

export const createCategory = async (req, res) => {
    const { categoryName, categoryDefinition } = req.body
    let categorySchema = parseAdminData(categoryDefinition);

    try {
        labItem.discriminator(categoryName, categorySchema);
        res.status(200).json(categorySchema);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

export const fetchCategory = async(req, res) => {
    const discriminatorKeys = labItem.discriminators;

    const discriminatorKeysArray = Object.keys(discriminatorKeys);

    try {
        res.status(200).json(discriminatorKeysArray);
    } catch (error) {
        console.log(error);
    }
}
