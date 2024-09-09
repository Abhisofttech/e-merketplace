// controllers/cartController.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; // Import the Product model

// Add item to cart
export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
 console.log('info',{ productId, quantity , userId })
  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (existingItemIndex > -1) {
      // Update quantity if the item already exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCartItems = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      res.json({ items: cart.items });
      // console.log(userId ,cart.items)
    } catch (error) {
        console.log("error in cart get items",error)
      res.status(500).json({ error: 'Server error' });
    }
  };

  export const deleteCartItem = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;
  
    try {
      // Find the cart
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      // Check if the item exists in the cart
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
  
      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Item deleted successfully', cart });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update item quantity in cart
  export const updateCartItemQuantity = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
  
    try {
      // Find the cart
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      // Check if the item exists in the cart
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
      if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
  
      // Update the quantity
      cart.items[itemIndex].quantity = quantity;
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: 'Quantity updated successfully', cart });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Clear all items in the cart
export const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear all items from the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
