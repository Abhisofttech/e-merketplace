// routes/categoryRoutes.js
import express from 'express';
import {  createCategory , getParentCategories, getSubCategoriesByParent } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/parent-categories', getParentCategories);
router.get('/subcategories/:parentId', getSubCategoriesByParent);

export default router;
