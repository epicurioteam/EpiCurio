import express from 'express'; 
import { fetchCategoryFields }  from '../controllers/labItem.js';


const router = express.Router(); 

router.get('/:category', fetchCategoryFields);

export default router;