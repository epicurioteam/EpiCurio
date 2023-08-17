import electronics from "./electronics.js";
import glassPlasticWare from './glassPlasticWare.js';
import safetyEquipment from './safetyEquipment.js';

import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName: String, 
    categoryDefinition: mongoose.Schema.Types.Mixed
    }
);

const Category = mongoose.model('categories', categorySchema);

export default {
    glassPlasticWare: glassPlasticWare,
    electronics: electronics,
    safetyEquipment: safetyEquipment,
}
