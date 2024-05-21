import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretkey');
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
