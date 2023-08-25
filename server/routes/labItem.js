import express from 'express'; 
import { fetchCategoryFields, saveItem }  from '../controllers/labItem.js';


const router = express.Router(); 

router.get('/:category', fetchCategoryFields);
router.post('/', saveItem);

export default router;