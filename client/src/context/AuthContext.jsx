import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in ms

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const storage = sessionStorage; // sessionStorage clears when browser/tab is closed

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = storage.getItem('token');
      const stored = storage.getItem('user');
      if (!token || !stored || isTokenExpired(token)) {
        storage.removeItem('token');
        storage.removeItem('user');
        storage.removeItem('loginTime');
        return null;
      }
      // Check 1-hour session window
      const loginTime = parseInt(storage.getItem('loginTime') || '0', 10);
      if (Date.now() - loginTime > SESSION_DURATION) {
        storage.removeItem('token');
        storage.removeItem('user');
        storage.removeItem('loginTime');
        return null;
      }
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const timerRef = useRef(null);

  const clearSession = useCallback(() => {
    storage.removeItem('token');
    storage.removeItem('user');
    storage.removeItem('loginTime');
    setUser(null);
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }, []);

  // Start / reset the 1-hour auto-logout timer
  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(clearSession, SESSION_DURATION);
  }, [clearSession]);

  const login = useCallback((userData, token) => {
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(userData));
    storage.setItem('loginTime', Date.now().toString());
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    clearTimeout(timerRef.current);
    storage.removeItem('token');
    storage.removeItem('user');
    storage.removeItem('loginTime');
    setUser(null);
  }, []);

  // Auto-logout after 1 hour of inactivity
  useEffect(() => {
    if (!user) return;

    resetTimer();

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));

    return () => {
      clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [user, resetTimer]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
