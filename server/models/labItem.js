import mongoose from "mongoose";
import labCategories from './labCategorySchemas/labCategories.js';

const labItemSchema= mongoose.Schema({

        // common lab item attributes
        name: { type: String, required: true },
        unit_quantity: { type: Number, default: 0 }, 
        location: { type: String, required: true },
        shelf_life: Number, 
        vendor: String,
        // link_to_item: String,
        description: String,
        // image: URL
        category: {
            type: String,
            required: true
        }, 
        createdAt: {
            type: String,
            default: new Date().toDateString(),
        },
    },
    {
        discriminatorKey: 'category'
    }
);

const labItem = mongoose.model('LabItem', labItemSchema);

export default labItem;