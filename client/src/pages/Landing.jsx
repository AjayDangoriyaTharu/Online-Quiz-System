import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const features = [
  { icon: '⚡', title: 'Instant Scoring', desc: 'Answers are evaluated automatically the moment you submit. No waiting, no manual checking.' },
  { icon: '🛡️', title: 'Anti-Cheat System', desc: 'Fullscreen lock, tab-switch detection, and violation tracking keep every quiz fair.' },
  { icon: '⏱️', title: 'Countdown Timer', desc: 'Each quiz runs with a live circular timer. Time runs out — quiz auto-submits.' },
  { icon: '📊', title: 'Result Analytics', desc: 'Score percentage, progress bar, and performance grade shown instantly after submission.' },
  { icon: '🔐', title: 'Role-Based Access', desc: 'Admins manage quizzes and questions. Students attempt and track their results.' },
  { icon: '🏆', title: 'Leaderboard', desc: 'Top 10 scores per quiz displayed in real-time so students can compete.' },
];

const steps = [
  { num: '01', title: 'Create Account', desc: 'Register as a student or admin using your email and password.' },
  { num: '02', title: 'Admin Sets Up Quiz', desc: 'Admin creates quizzes and adds MCQ questions with correct answers.' },
  { num: '03', title: 'Student Attempts', desc: 'Student picks a quiz, answers questions one by one within the timer.' },
  { num: '04', title: 'Instant Results', desc: 'Score, percentage, and grade are shown immediately after submission.' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page}>

      {/* ── NAVBAR ── */}
      <header className={styles.navbarWrapper}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navBrand}>
            <div className={styles.navIcon}>Q</div>
            <span className={styles.navTitle}>QuizSystem</span>
          </Link>

          {/* Desktop links */}
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how" className={styles.navLink}>How it works</a>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navCta}>Get Started →</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#features" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#roles" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>For who?</a>
            <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>Get Started →</Link>
          </div>
        )}
      </header>

      {/* Spacer to push content below fixed navbar */}
      <div className={styles.navSpacer} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />

        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Online Quiz Platform
        </div>

        <h1 className={styles.heroTitle}>
          The Smarter Way<br />
          to <span className={styles.heroTitleGrad}>Run Quizzes</span>
        </h1>

        <p className={styles.heroDesc}>
          Create, manage, and attempt quizzes online with automated scoring,
          anti-cheat protection, and instant results — all in one platform.
        </p>

        <div className={styles.heroActions}>
          <Link to="/register" className={styles.btnPrimary}>
            Start for Free →
          </Link>
          <a href="#how" className={styles.btnSecondary}>
            See how it works
          </a>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <div className={styles.heroStatNum}>100%</div>
            <div className={styles.heroStatLabel}>Auto Scored</div>
          </div>
          <div className={styles.heroStat}>
            <div className={styles.heroStatNum}>0s</div>
            <div className={styles.heroStatLabel}>Result Delay</div>
          </div>
          <div className={styles.heroStat}>
            <div className={styles.heroStatNum}>JWT</div>
            <div className={styles.heroStatLabel}>Secured</div>
          </div>

        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.section} id="features">
        <span className={styles.sectionTag}>Features</span>
        <h2 className={styles.sectionTitle}>Everything you need<br />to run great quizzes</h2>
        <p className={styles.sectionDesc}>
          Built for educators and students — a complete quiz management system
          with security, analytics, and a modern UI.
        </p>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <div className={styles.howSection} id="how">
        <div className={styles.howInner}>
          <span className={styles.sectionTag}>How it works</span>
          <h2 className={styles.sectionTitle}>Up and running<br />in 4 simple steps</h2>
          <p className={styles.sectionDesc}>
            From registration to results — the entire flow takes minutes.
          </p>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to get started?</h2>
          <p className={styles.ctaDesc}>
            Create your free account in seconds. No credit card required.
            Start building quizzes or attempting them right away.
          </p>
          <div className={styles.ctaActions}>
            <Link to="/register" className={styles.btnPrimary}>
              Create Free Account →
            </Link>
            <Link to="/login" className={styles.btnSecondary}>
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link to="/" className={styles.footerBrand}>
            <div className={styles.footerIcon}>Q</div>
            <span className={styles.footerTitle}>QuizSystem</span>
          </Link>
          <span className={styles.footerCopy}>© 2026 QuizSystem. Built By @Ajay_Dangoriya_Tharu .</span>
        </div>
      </footer>

    </div>
  );
}
