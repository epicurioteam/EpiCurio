import labItem from "../models/labItem.js";
import mongoose from "mongoose";

export const fetchCategoryFields = async(req, res) => {
    try {
        const { category } = req.params;

        const categorySchema = mongoose.model(category);
        const schemaPaths = Object.keys(categorySchema.schema.paths);

        res.status(200).json(schemaPaths);
    } catch (error) {
      console.log(error);  
    }
}

