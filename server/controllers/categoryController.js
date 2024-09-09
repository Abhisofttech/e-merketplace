// controllers/categoryController.js
import Category from '../models/Category.js';

// Get all categories
export const getParentCategories = async (req, res) => {
    try {
        const parentCategories = await Category.find({ parentCategory: null });
        res.json({ categories: parentCategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parent categories', error });
    }
};

// Get subcategories by parent category ID
export const getSubCategoriesByParent = async (req, res) => {
    const { parentId } = req.params;
    try {
        const subCategories = await Category.find({ parentCategory: parentId });
        res.json({ subCategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories', error });
    }
};

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name, parentCategory } = req.body;

        // Check if the category name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }

        // Validate the parentCategory field if provided
        let parentCategoryId = null;
        if (parentCategory) {
            const parentCategoryDoc = await Category.findById(parentCategory);
            if (!parentCategoryDoc) {
                return res.status(400).json({ error: 'Parent category not found' });
            }
            parentCategoryId = parentCategory;
        }

        // Create and save the new category
        const category = new Category({ name, parentCategory: parentCategoryId });
        await category.save();

        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
