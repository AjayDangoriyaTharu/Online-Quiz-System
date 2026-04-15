import { useAuth } from '../context/AuthContext';
import { useResults } from '../hooks/useResults';
import { formatDate } from '../utils/format';
import { GRADE_COLOR } from '../constants';
import styles from './ResultsPage.module.css';

export default function ResultsPage() {
  const { user } = useAuth();
  const { results, loading, error } = useResults(user.id);

  if (loading) return <div className={styles.spinner} />;

  return (
    <div>
      <h2 className={styles.heading}>My Results</h2>

      {error && <p className={styles.error}>{error}</p>}

      {!error && results.length === 0 && (
        <div className={styles.empty}>
          <p>No quiz attempts yet.</p>
          <p className={styles.emptyHint}>Head to the dashboard to attempt a quiz.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r._id}>
                  <td className={styles.quizName}>{r.quizId?.title ?? '—'}</td>
                  <td>
                    <span className={styles.scoreBadge}>
                      {r.score} / {r.totalQuestions}
                    </span>
                  </td>
                  <td>
                    <div className={styles.percentCell}>
                      <div className={styles.bar}>
                        <div
                          className={styles.barFill}
                          style={{ width: `${r.percentage}%`, background: GRADE_COLOR(r.percentage) }}
                        />
                      </div>
                      <span>{r.percentage?.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className={styles.date}>{formatDate(r.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
