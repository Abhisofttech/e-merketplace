import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
