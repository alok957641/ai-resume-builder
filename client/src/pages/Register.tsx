import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowRight, CheckCircle2, Eye, EyeOff, FileCheck2, LayoutTemplate, Sparkles } from "lucide-react";
import api from "../api";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthResponse, RegisterForm } from "../types";

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
  return {
    score,
    label: password ? labels[score] || "Strong" : "",
    width: `${Math.min(100, score * 22)}%`,
  };
}

function TemplateStack() {
  return (
    <div className="auth-template-stack" aria-hidden="true">
      <div className="stack-card one">
        <span />
        <i />
        <i />
        <i />
      </div>
      <div className="stack-card two">
        <span />
        <i />
        <i />
        <i />
      </div>
      <div className="stack-card three">
        <span />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { setAuth, isLoggedIn } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post<AuthResponse>("/auth/register", data);
      setAuth(res.data.user, res.data.token);
      toast.success(res.data.message || "Account created.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  const strength = getStrength(password);

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
              <FileCheck2 size={16} />
              Build your first resume today
            </div>
            <h1>Choose a template, fill details, and download.</h1>
            <p>Start with guided sections and ATS-friendly templates made for real job applications.</p>
          </div>
          <TemplateStack />
          <div className="auth-benefits">
            <span><LayoutTemplate size={16} /> 10+ templates</span>
            <span><Sparkles size={16} /> AI writing</span>
            <span><CheckCircle2 size={16} /> ATS score</span>
          </div>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-head">
            <span>Create account</span>
            <h2>Start your resume</h2>
            <p>Get your dashboard, templates, builder, score checker, and PDF export.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="auth-form">
            <label>
              <span>Full name</span>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Rahul Kumar"
                autoComplete="name"
              />
              {errors.name && <small>{errors.name.message}</small>}
            </label>

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
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  type={showPass ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button type="button" onClick={() => setShowPass((value) => !value)} aria-label="Toggle password visibility">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && (
                <div className="strength-meter">
                  <span><i style={{ width: strength.width }} /></span>
                  <em>{strength.label}</em>
                </div>
              )}
              {errors.password && <small>{errors.password.message}</small>}
            </label>

            <button type="submit" disabled={isSubmitting} className="auth-submit">
              {isSubmitting ? "Creating account..." : "Create account"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
