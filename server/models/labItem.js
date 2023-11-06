import mongoose from "mongoose";
import Category from "./labCategorySchemas/labCategories.js";

const labItemSchema = mongoose.Schema(
  {
    // common lab item attributes
    name: { type: String, required: true },
    unit_quantity: { type: Number, default: 0 },
    location: { type: String, required: true },
    shelf_life: Number,
    vendor: String,
    description: String,
    category: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: new Date().toDateString(),
    },
  },
  {
    discriminatorKey: "category",
  }
);

const LabItem = mongoose.model("LabItem", labItemSchema);

// Create a discriminator model for each category
(async () => {
  const categories = await Category.find();
  for (const category of categories) {
    const { categoryName, categoryDefinition } = category;

    // Log the categoryDefinition object
    //console.log(`categoryDefinition for ${categoryName}:`, categoryDefinition);

    // Convert the categoryDefinition array to a schema definition
    const schemaDefinition = {};
    for (const field of categoryDefinition) {
      const { name, type } = field;

      // Skip the "category" field
      if (name === "category") {
        continue;
      }

      // Check if the type is undefined or not a valid SchemaType
      if (
        type === undefined ||
        !Object.keys(mongoose.SchemaTypes).includes(type)
      ) {
        console.error(
          `Invalid type for field ${name} in categoryDefinition for ${categoryName}: ${type}`
        );
        continue;
      }

      schemaDefinition[name] = mongoose.SchemaTypes[type];
    }
    // Create a new schema and discriminator with this definition
    const categorySchema = new mongoose.Schema(schemaDefinition);
    LabItem.discriminator(categoryName, categorySchema);
  }
})();

export default LabItem;
