import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    unique: true,
  },
  categoryDefinition: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
