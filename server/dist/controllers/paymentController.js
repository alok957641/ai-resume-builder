"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// ✅ Order banao
const createOrder = async (req, res) => {
    try {
        const options = {
            amount: 29900, // ₹299 in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Order create nahi hua', error });
    }
};
exports.createOrder = createOrder;
// ✅ Payment verify karo
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user.id;
        // Signature verify karo
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto_1.default
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex');
        if (expectedSign !== razorpay_signature) {
            res.status(400).json({ message: 'Payment verify nahi hua — fraud!' });
            return;
        }
        // User ko Pro banao
        await User_1.default.findByIdAndUpdate(userId, { plan: 'pro' });
        res.json({ message: '🎉 Pro plan active ho gaya!', success: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Verification failed', error });
    }
};
exports.verifyPayment = verifyPayment;
