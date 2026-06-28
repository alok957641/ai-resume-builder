import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PRO_FEATURES = [
  "Unlimited resume versions",
  "All premium templates",
  "Advanced AI rewriting",
  "PDF download without watermark",
  "Public resume sharing link",
  "AI interview questions",
  "ATS score checker",
  "Priority support",
];

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const orderRes = await api.post("/payment/create-order");
      const { orderId, amount, currency, keyId } = orderRes.data;

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: keyId,
          amount,
          currency,
          name: "ResumeAI Pro",
          description: "Pro Plan - 1 Month Subscription",
          order_id: orderId,
          handler: async (response: any) => {
            try {
              const verifyRes = await api.post("/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.data.success) {
                const token = localStorage.getItem("token") || "";
                setAuth({ ...user!, plan: "pro" }, token);
                toast.success("Pro plan activated successfully.");
                navigate("/dashboard");
              }
            } catch {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: { color: "#0f172a" },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.error("Payment was cancelled.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      };
    } catch {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} /> Dashboard
        </button>

        <section className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[1fr_420px]">
          <div className="bg-slate-950 p-8 text-white sm:p-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-cyan-100">
              <Crown size={15} /> ResumeAI Pro
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">
              Unlock the complete resume builder.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Build unlimited resumes, use premium templates, generate stronger content, and share polished public resume links.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [ShieldCheck, "Secure payment"],
                [Zap, "Instant access"],
                [Sparkles, "Premium AI tools"],
              ].map(([Icon, label]) => {
                const TypedIcon = Icon as typeof ShieldCheck;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <TypedIcon className="mb-3 text-cyan-200" size={22} />
                    <p className="text-sm font-bold">{label as string}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="p-6 sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-slate-500">Monthly plan</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-black text-slate-950">Rs 299</span>
                <span className="mb-2 text-sm font-bold text-slate-500">/ month</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">Cancel anytime. UPI, cards, and netbanking supported.</p>

              <ul className="mt-6 grid gap-3">
                {PRO_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={13} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-base font-black text-white shadow-lg shadow-slate-900/15 disabled:opacity-60"
              >
                <Crown size={18} />
                {loading ? "Processing..." : "Upgrade now"}
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
