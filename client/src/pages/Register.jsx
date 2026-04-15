import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import styles from './Login.module.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', adminSecret: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
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
      const payload = { name: form.name, email: form.email, password: form.password };
      if (form.adminSecret) payload.adminSecret = form.adminSecret;
      await api.post('/auth/register', payload);
      navigate('/login');
    } catch (err) {
      setApiError(err.response?.data?.error || 'Registration failed. Please try again.');
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
              Create your free account and start taking quizzes instantly.
              Track your performance, compete on leaderboards, and improve
              your knowledge with automated scoring.
            </p>
          </div>

          {/* Bottom buttons */}
          <div className={styles.leftButtons}>
            <Link to="/login" className={styles.btnLeftOutline}>Login</Link>
            <Link to="/register" className={styles.btnLeftActive}>Register</Link>
          </div>

        </div>
      </div>

      {/* ── RIGHT SECTION ── */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Account</h2>
          <p className={styles.cardSubtitle}>Fill in the details below to get started.</p>

          {apiError && (
            <div className={styles.errorBanner}>
              <span>⚠</span> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                placeholder="Ajay Tharu"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
              />
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${styles.inputWithIcon} ${errors.password ? styles.inputError : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(p => !p)} tabIndex={-1}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${styles.inputWithIcon} ${errors.confirmPassword ? styles.inputError : ''}`}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  autoComplete="new-password"
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
            </div>

            {/* Admin Secret Toggle */}
            <div className={styles.formGroup}>
              <div
                style={{ color: '#a78bfa', fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none', marginBottom: showSecret ? '10px' : 0 }}
                onClick={() => setShowSecret(s => !s)}
              >
                {showSecret ? '▲ Hide admin options' : '▼ Register as Admin?'}
              </div>
              {showSecret && (
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Admin Secret Key"
                  value={form.adminSecret}
                  onChange={e => setForm({ ...form, adminSecret: e.target.value })}
                />
              )}
            </div>

            {/* Submit */}
            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? (
                <><div className={styles.spinner} /> Creating Account...</>
              ) : (
                'Create Account'
              )}
            </button>

          </form>

          <p className={styles.registerRow}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
