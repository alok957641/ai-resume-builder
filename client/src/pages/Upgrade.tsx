import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, ArrowLeft, Zap, Shield, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuthStore } from '../store/useAuthStore';

declare global {
  interface Window { Razorpay: any; }
}

const PRO_FEATURES = [
  'Unlimited Resume Creation',
  'Access to All 10 Premium Templates',
  'Advanced AI — Full Content Rewrite',
  'PDF Download Without Watermark',
  'Public Resume Link (yourapp/r/username)',
  'AI Interview Questions Generator',
  'Resume Score Checker',
  'Priority Customer Support',
];

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // Step 1: Create order from backend
      const orderRes = await api.post('/payment/create-order');
      const { orderId, amount, currency, keyId } = orderRes.data;

      // Step 2: Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: keyId,
          amount,
          currency,
          name: 'ResumeAI Pro',
          description: 'Pro Plan — 1 Month Subscription',
          order_id: orderId,
          handler: async (response: any) => {
            try {
              // Step 3: Verify payment
              const verifyRes = await api.post('/payment/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.data.success) {
                // Update user store
                const token = localStorage.getItem('token') || '';
                setAuth({ ...user!, plan: 'pro' }, token);
                toast.success('🎉 Pro plan activated successfully!');
                navigate('/dashboard');
              }
            } catch {
              toast.error('Payment verification failed!');
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: { color: '#4F46E5' },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.error('Payment was cancelled!');
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      };
    } catch {
      toast.error('Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">

        {/* Back button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown size={32} className="text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pro Plan</h1>
            <div className="flex items-end justify-center gap-1">
              <span className="text-5xl font-bold">₹299</span>
              <span className="text-indigo-200 mb-2">/month</span>
            </div>
            <p className="text-indigo-200 text-sm mt-2">
              No credit card required • Cancel anytime
            </p>
          </div>

          {/* Features */}
          <div className="p-8">
            <h3 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wider">
              What's included in Pro:
            </h3>
            <ul className="space-y-3 mb-8">
              {PRO_FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* Badges */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: <Shield size={14}/>, text: 'Secure Payment' },
                { icon: <Zap size={14}/>, text: 'Instant Access' },
                { icon: <Sparkles size={14}/>, text: 'Cancel Anytime' },
              ].map((b, i) => (
                <div key={i} className="flex-1 flex items-center gap-1.5 bg-gray-50 rounded-xl p-2.5 text-xs text-gray-600 justify-center">
                  {b.icon} {b.text}
                </div>
              ))}
            </div>

            {/* Pay Button */}
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-indigo-200"
            >
              {loading ? 'Processing...' : '💳 Upgrade Now — ₹299'}
            </button>

            <p className="text-center text-gray-400 text-xs mt-4">
              UPI, Cards, NetBanking — all accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}