// ── Routes ────────────────────────────────────────────────
export const ROUTES = {
  HOME:      '/',
  LOGIN:     '/login',
  REGISTER:  '/register',
  DASHBOARD: '/dashboard',
  QUIZ:      (id) => `/quiz/${id}`,
  RESULTS:   '/results',
  ADMIN:     '/admin',
};

// ── Local storage keys ────────────────────────────────────
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER:  'user',
};

// ── Quiz ──────────────────────────────────────────────────
export const MAX_VIOLATIONS        = 3;
export const NO_TIME_LIMIT_SECONDS = 99 * 60; // 99 min = effectively no limit

// ── Score thresholds (%) ──────────────────────────────────
export const SCORE_THRESHOLDS = {
  HIGH:   80,
  MEDIUM: 50,
};

// ── Grade colors ──────────────────────────────────────────
export const GRADE_COLOR = (pct) => {
  if (pct >= SCORE_THRESHOLDS.HIGH)   return '#10b981';
  if (pct >= SCORE_THRESHOLDS.MEDIUM) return '#f59e0b';
  return '#ef4444';
};
