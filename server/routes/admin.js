import express from "express";
import { createCategory } from '../controllers/admin.js';

const router = express.Router(); 

// create Category router
router.post('/', createCategory);

export default router;