import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, SCORE_THRESHOLDS, GRADE_COLOR } from '../../constants';
import styles from './Quiz.module.css';

export default function ResultScreen({ score, totalQuestions, percentage }) {
  const [showLoading, setShowLoading] = useState(true);
  const [barWidth, setBarWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      setShowLoading(false);
      setTimeout(() => setBarWidth(percentage), 100);
    }, 2000);
    return () => clearTimeout(t);
  }, [percentage]);

  const getResult = () => {
    if (percentage >= SCORE_THRESHOLDS.HIGH)   return { label: '🏆 Excellent! High Score',      cls: styles.high };
    if (percentage >= SCORE_THRESHOLDS.MEDIUM) return { label: '👍 Medium — Keep Practicing',   cls: styles.medium };
    return                                            { label: '❌ Failed — Try Again',           cls: styles.failed };
  };

  const getEmoji = () => {
    if (percentage >= SCORE_THRESHOLDS.HIGH)   return '🎉';
    if (percentage >= SCORE_THRESHOLDS.MEDIUM) return '😊';
    return '😔';
  };

  const result   = getResult();
  const barColor = GRADE_COLOR(percentage);

  if (showLoading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingSpinner} />
        <span className={styles.loadingText}>Calculating Results...</span>
      </div>
    );
  }

  return (
    <div className={styles.resultOverlay}>
      <div className={styles.resultCard}>
        <div className={styles.resultEmoji}>{getEmoji()}</div>
        <h2 className={styles.resultTitle}>Quiz Completed!</h2>
        <p className={styles.resultSubtitle}>Here is your performance summary</p>

        <div className={styles.scoreCircle}>
          <span className={styles.scorePercent}>{Math.round(percentage)}%</span>
          <span className={styles.scoreLabel}>SCORE</span>
        </div>

        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBarLabel}>
            <span>{score} correct</span>
            <span>{totalQuestions} total</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${barWidth}%`, background: barColor }}
            />
          </div>
        </div>

        <span className={`${styles.resultMessage} ${result.cls}`}>{result.label}</span>

        <div className={styles.resultActions}>
          <button className={styles.btnDashboard} onClick={() => navigate(ROUTES.DASHBOARD)}>
            Dashboard
          </button>
          <button className={styles.btnViewResults} onClick={() => navigate(ROUTES.RESULTS)}>
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
