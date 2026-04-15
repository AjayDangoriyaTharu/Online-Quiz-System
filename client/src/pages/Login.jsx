import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>

      {/* ── LEFT SECTION ── */}
      <div className={styles.left}>
        <div className={styles.leftContent}>

          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>Q</div>
            <span className={styles.logoText}>QuizSystem</span>
          </div>

          {/* Marketing */}
          <div className={styles.marketing}>
            <p className={styles.marketingTag}>Join Our Marketplace</p>
            <h1 className={styles.marketingTitle}>
              QUIZ<br /><span>SYSTEM</span>
            </h1>
            <p className={styles.marketingDesc}>
              A modern online quiz platform for students and educators.
              Create quizzes, attempt them in real-time, and track your
              performance with instant automated scoring.
            </p>
          </div>

          {/* Bottom buttons */}
          <div className={styles.leftButtons}>
            <Link to="/login" className={styles.btnLeftActive}>Login</Link>
            <Link to="/register" className={styles.btnLeftOutline}>Register</Link>
          </div>

        </div>
      </div>

      {/* ── RIGHT SECTION ── */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Account Login</h2>
          <p className={styles.cardSubtitle}>Welcome back! Please enter your credentials.</p>

          {apiError && (
            <div className={styles.errorBanner}>
              <span>⚠</span> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Username or Email</label>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${styles.inputWithIcon} ${errors.password ? styles.inputError : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Options row */}
            <div className={styles.optionsRow}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember Me
              </label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Submit */}
            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? (
                <><div className={styles.spinner} /> Logging in...</>
              ) : (
                'Login to your Account!'
              )}
            </button>

          </form>

          <p className={styles.registerRow}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
