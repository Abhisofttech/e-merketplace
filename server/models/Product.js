import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category model
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 }, // Number of items in stock
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields


// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;


