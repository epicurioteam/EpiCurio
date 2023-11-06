import express from "express";
import {
  deleteItem,
  fetchCategoryFields,
  getItems,
  getItemDetails,
  saveItem,
} from "../controllers/labItem.js";

const router = express.Router();

// item routes
router.get("/", getItems);
router.get("/:id", getItemDetails);

// category routes
router.get("/category/:category", fetchCategoryFields);

router.post("/", saveItem);

// router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
