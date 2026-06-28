import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowRight, CheckCircle2, Eye, EyeOff, FileText, ShieldCheck, Sparkles } from "lucide-react";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthResponse, LoginForm } from "../types";

function AuthResumePreview() {
  return (
    <div className="auth-resume-card" aria-hidden="true">
      <div className="auth-resume-top">
        <div>
          <strong>Rahul Verma</strong>
          <span>Product Analyst</span>
        </div>
        <div className="auth-score">94</div>
      </div>
      <div className="auth-lines">
        <i style={{ width: "88%" }} />
        <i style={{ width: "72%" }} />
        <i style={{ width: "94%" }} />
      </div>
      <div className="auth-section-title">Experience</div>
      <div className="auth-lines compact">
        <i style={{ width: "78%" }} />
        <i style={{ width: "91%" }} />
        <i style={{ width: "68%" }} />
      </div>
      <div className="auth-pills">
        <span>SQL</span>
        <span>Excel</span>
        <span>Power BI</span>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post<AuthResponse>("/auth/login", data);
      setAuth(res.data.user, res.data.token);
      toast.success(res.data.message || "Welcome back.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <aside className="auth-visual">
          <Link to="/" className="auth-brand">
            <span>R</span>
            ResumeAI
          </Link>
          <div className="auth-visual-copy">
            <div className="eyebrow light">
              <ShieldCheck size={16} />
              ATS-ready resume workspace
            </div>
            <h1>Continue building your professional resume.</h1>
            <p>Open your saved resumes, improve content with AI, check ATS score, and export a clean PDF.</p>
          </div>
          <AuthResumePreview />
          <div className="auth-benefits">
            <span><CheckCircle2 size={16} /> Saved templates</span>
            <span><Sparkles size={16} /> AI suggestions</span>
            <span><FileText size={16} /> PDF export</span>
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-head">
            <span>Welcome back</span>
            <h2>Log in to ResumeAI</h2>
            <p>Resume dashboard, builder, templates, and ATS tools are waiting.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
            <label>
              <span>Email address</span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                })}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label>
              <span>Password</span>
              <div className="password-field">
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass((value) => !value)} aria-label="Toggle password visibility">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <small>{errors.password.message}</small>}
            </label>

            <div className="auth-row">
              <label className="check-row">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <button type="button" onClick={() => toast("Password reset flow coming soon.")}>Forgot password?</button>
            </div>

            <button type="submit" disabled={isSubmitting} className="auth-submit">
              {isSubmitting ? "Logging in..." : "Log in"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
