import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Layout.module.css';

// Pages that manage their own full-screen layout
const NO_LAYOUT_PATHS = ['/'];
const AUTH_PATHS = ['/login', '/register'];

export default function Layout({ children }) {
  const { pathname } = useLocation();

  // Landing page and quiz page handle their own layout entirely
  if (NO_LAYOUT_PATHS.includes(pathname) || pathname.startsWith('/quiz/')) {
    return <>{children}</>;
  }

  // Auth pages (login/register) — show navbar but no content container
  if (AUTH_PATHS.includes(pathname)) {
    return (
      <div className={styles.shell}>
        <Navbar />
        {children}
      </div>
    );
  }

  // All other pages: fixed navbar + offset main content
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
}
