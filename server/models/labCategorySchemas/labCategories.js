import electronics from "./electronics.js";
import glassPlasticWare from './glassPlasticWare.js';
import safetyEquipment from './safetyEquipment.js';

import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        unique: true
    },
    categoryDefinition: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
});

const Category = mongoose.model('categories', categorySchema);

// export default 
// {
//     glassPlasticWare: glassPlasticWare,
//     electronics: electronics,
//     safetyEquipment: safetyEquipment,
// }

export default Category;
