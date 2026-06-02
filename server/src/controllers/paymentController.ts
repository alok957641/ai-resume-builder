import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// ✅ Order banao
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const options = {
      amount: 29900,           // ₹299 in paise
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
  } catch (error) {
    res.status(500).json({ message: 'Order create nahi hua', error });
  }
};

// ✅ Payment verify karo
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = (req as any).user.id;

    // Signature verify karo
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
  .update(sign)
  .digest('hex')

    if (expectedSign !== razorpay_signature) {
      res.status(400).json({ message: 'Payment verify nahi hua — fraud!' });
      return;
    }

    // User ko Pro banao
    await User.findByIdAndUpdate(userId, { plan: 'pro' });

    res.json({ message: '🎉 Pro plan active ho gaya!', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error });
  }
};