import express from "express";
import { createCategory, fetchCategory } from '../controllers/admin.js';

const router = express.Router(); 

// create Category router
router.post('/', createCategory);
router.get('/categories', fetchCategory);

export default router;