import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await find().populate('user').populate('products');
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
