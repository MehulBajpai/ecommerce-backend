import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
});

const Order = model('Order', orderSchema);
export default Order;
