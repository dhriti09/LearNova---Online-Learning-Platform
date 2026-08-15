import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  IconGraduationCap,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconChalkboard,
  IconCheck,
} from "../components/Icons";

export default function Register() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole =
    searchParams.get("role") === "instructor" ? "instructor" : "student";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: initialRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const setRole = (role) => setForm((f) => ({ ...f, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <span className="brand-mark" style={{ width: 44, height: 44 }}>
            <IconGraduationCap size={22} />
          </span>
          <h2>Start learning &mdash; or start teaching.</h2>
          <p>
            Join Learnova as a student to build new skills, or as an
            instructor to share what you already know with others.
          </p>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-box fade-in">
          <h1>Sign up</h1>
          <p>Create your free account to get started.</p>

          {error && (
            <div className="form-banner form-banner-error">
              <IconAlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label>I am a</label>
              <div className="role-select">
                <button
                  type="button"
                  className={"role-card" + (form.role === "student" ? " active" : "")}
                  onClick={() => setRole("student")}
                  aria-pressed={form.role === "student"}
                >
                  <span className="role-card-icon">
                    <IconGraduationCap size={19} />
                  </span>
                  <span className="role-card-title">Student</span>
                  <span className="role-card-desc">Learn skills</span>
                </button>
                <button
                  type="button"
                  className={"role-card" + (form.role === "instructor" ? " active" : "")}
                  onClick={() => setRole("instructor")}
                  aria-pressed={form.role === "instructor"}
                >
                  <span className="role-card-icon">
                    <IconChalkboard size={19} />
                  </span>
                  <span className="role-card-title">Instructor</span>
                  <span className="role-card-desc">Teach skills</span>
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="input"
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-icon-button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              <span className="field-hint">At least 6 characters.</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting}
            >
              {submitting ? (
                "Creating account..."
              ) : (
                <>
                  <IconCheck size={16} /> Sign up
                </>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
