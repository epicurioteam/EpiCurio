import express from "express";
import {
  deleteItem,
  fetchCategoryFields,
  getItems,
  saveItem,
} from "../controllers/labItem.js";

const router = express.Router();

// category routes
router.get("/:category", fetchCategoryFields);

// item routes
router.get("/", getItems);

router.post("/", saveItem);

// router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
