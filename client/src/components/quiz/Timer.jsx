import { useEffect, useRef } from 'react';
import styles from './Quiz.module.css';

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ timeLeft, totalSeconds, onExpire }) {
  const initialRef = useRef(totalSeconds ?? timeLeft);

  useEffect(() => {
    if (timeLeft === 0) onExpire();
  }, [timeLeft, onExpire]);

  const total    = initialRef.current || 1;
  const progress = timeLeft / total;
  const offset   = CIRCUMFERENCE * (1 - progress);

  // Color thresholds: last 20% = warning, last 5% = danger
  const color = progress > 0.2 ? '#7c3aed' : progress > 0.05 ? '#f59e0b' : '#ef4444';

  // Display as MM:SS when >= 60 seconds
  const display = timeLeft >= 60
    ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`
    : String(timeLeft);

  const label = timeLeft >= 60 ? 'MIN' : 'SEC';

  return (
    <div className={styles.timerWrapper}>
      <span className={styles.timerLabel}>Time</span>
      <div className={styles.timerCircle}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle className={styles.timerTrack} cx="55" cy="55" r={RADIUS} />
          <circle
            className={styles.timerProgress}
            cx="55" cy="55" r={RADIUS}
            stroke={color}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.timerText}>
          <span className={styles.timerSeconds}>{display}</span>
          <span className={styles.timerSub}>{label}</span>
        </div>
      </div>
    </div>
  );
}
