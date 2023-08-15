import mongoose from "mongoose";
import * as labItemCategories from '../../client/src/constants/labItemCategory';
import labItemCategorySchemas from './labCategorySchemas/labCategories';

const labItemSchema= mongoose.Schema({

        // common lab item attributes
        name: { type: String, required: true },
        unit_quantity: { type: Number, default: 0 }, 
        location: { type: String, required: true },
        // shelf_life: Number, 
        vendor: String,
        // link_to_item: String,
        description: String,
        // image: URL
        category: {
            type: String,
            enum: Object.values(labItemCategories),
            required: true
        }, 
        createdAt: {
            type: Date,
            default: new Date(),
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
    },
    {
        discriminatorKey: 'category'
    }
);

// Create subschemas corresponding to the lab item categories
for (const categoryName in labItemCategorySchemas) {
    const categorySchema = labItemCategorySchemas[categoryName];
    labItemSchema.discriminator(categoryName, categorySchema);
}

const labItem = mongoose.model('LabItem', labItemSchema);

export default labItem;