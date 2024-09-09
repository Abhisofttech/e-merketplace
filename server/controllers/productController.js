import Product from '../models/Product.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

// Configure multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Optional: Specify a folder in your Cloudinary account
        format: async (req, file) => {
            const supportedFormats = ['jpeg', 'png', 'jpg', 'gif', 'bmp', 'webp']; // Add more formats as needed
            const ext = file.mimetype.split('/')[1]; // Extract file extension from MIME type

            // Check if the extracted format is supported, else default to 'png'
            return supportedFormats.includes(ext) ? ext : 'png';
        },
        public_id: (req, file) => Date.now().toString() + '-' + file.originalname, // File naming convention
    },
});


const upload = multer({ storage }).single('image');

// Create a new product
export const createProduct = async (req, res) => {
    upload(req, res, async function (error) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'File upload failed', error });
        }

        try {
            const { name, description, price, category, stock, seller } = req.body;

            if (!seller) {
                return res.status(400).json({ error: 'Seller ID is required' });
            }

            const product = new Product({
                name,
                description,
                price,
                category,
                stock,
                seller,
                imageUrl: req.file ? req.file.path : null, // Cloudinary's file URL
            });

            await product.save();
            res.status(201).json({ message: 'Product Created Successfully', product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error creating product', error });
        }
    });
};

// Update a product
export const updateProduct = async (req, res) => {
    upload(req, res, async function (error) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'File upload failed', error });
        }

        try {
            const { id } = req.params;
            const { name, description, price, category, stock } = req.body;
            const product = await Product.findById(id);

            if (!product) return res.status(404).json({ message: 'Product not found' });

            if (req.file) {
                // Delete the old image from Cloudinary
                if (product.imageUrl) {
                    const publicId = product.imageUrl.split('/').pop().split('.')[0]; // Extract the public_id
                    await cloudinary.uploader.destroy(publicId); // Delete the image
                }
                product.imageUrl = req.file.path;
            }

            product.name = name;
            product.description = description;
            product.price = price;
            product.category = category;
            product.stock = stock;
            product.updatedAt = Date.now();

            await product.save();
            res.json({ message: 'Product updated successfully', product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating product', error });
        }
    });
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Delete the image from Cloudinary
        if (product.imageUrl) {
            const publicId = product.imageUrl.split('/').pop().split('.')[0]; // Extract the public_id
            await cloudinary.uploader.destroy(publicId); // Delete the image
        }

        // Delete the product from MongoDB
        await Product.deleteOne({ _id: id });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products });
        // console.log(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching products', error });
    }
};

// Get products by seller
export const getProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("userId", userId);
        const products = await Product.find({ seller: userId });
        res.json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching product', error });
    }
};


