import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/format';
import { ROUTES } from '../constants';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const isAdmin  = user?.role === 'admin';
  const homePath = user ? (isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD) : ROUTES.HOME;
  const initials = getInitials(user?.name);

  return (
    <nav className={styles.navbar}>

      <Link to={homePath} className={styles.brand}>
        <div className={styles.brandIcon}>Q</div>
        <span className={styles.brandText}>QuizSystem</span>
      </Link>

      <div className={styles.links}>

        {/* ── NOT LOGGED IN ── */}
        {!user && (
          <>
            <a href="/#features" className={`${styles.link} ${styles.linkAnchor}`}>Features</a>
            <a href="/#how"      className={`${styles.link} ${styles.linkAnchor}`}>How it works</a>
            <div className={`${styles.divider} ${styles.dividerMobile}`} />
            <Link to={ROUTES.LOGIN} className={`${styles.link} ${pathname === ROUTES.LOGIN ? styles.linkActive : ''}`}>
              Login
            </Link>
            <Link to={ROUTES.REGISTER} className={styles.registerBtn}>
              Get Started →
            </Link>
          </>
        )}

        {/* ── STUDENT ── */}
        {user && !isAdmin && (
          <>
            <Link to={ROUTES.DASHBOARD} className={`${styles.link} ${pathname === ROUTES.DASHBOARD ? styles.linkActive : ''}`}>
              🏠 <span className={styles.linkText}>Dashboard</span>
            </Link>
            <Link to={ROUTES.RESULTS} className={`${styles.link} ${pathname === ROUTES.RESULTS ? styles.linkActive : ''}`}>
              📊 <span className={styles.linkText}>My Results</span>
            </Link>
            <div className={styles.divider} />
            <div className={styles.userBadge}>
              <div className={styles.avatar}>{initials}</div>
              <span className={styles.userName}>{user.name}</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}

        {/* ── ADMIN ── */}
        {user && isAdmin && (
          <>
            <div className={styles.divider} />
            <div className={styles.userBadge}>
              <div className={styles.avatar}>{initials}</div>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.roleBadge}>Admin</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}

      </div>
    </nav>
  );
}
