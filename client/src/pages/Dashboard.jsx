import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useQuizzes } from '../hooks/useQuizzes';
import { ROUTES } from '../constants';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { quizzes, attempted, loading, error } = useQuizzes(user.id);
  const [pinModal, setPinModal]   = useState(null);
  const [pin, setPin]             = useState('');
  const [pinError, setPinError]   = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = (quiz) => {
    if (attempted.has(quiz._id)) return;
    if (quiz.hasPin) {
      setPinModal({ quizId: quiz._id, title: quiz.title });
      setPin('');
      setPinError('');
    } else {
      navigate(ROUTES.QUIZ(quiz._id));
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pin.trim()) { setPinError('Please enter the PIN.'); return; }
    setPinLoading(true);
    setPinError('');
    try {
      await api.post(`/quizzes/${pinModal.quizId}/verify-pin`, { pin });
      setPinModal(null);
      navigate(ROUTES.QUIZ(pinModal.quizId));
    } catch (err) {
      setPinError(err.response?.data?.error || 'Incorrect PIN.');
    } finally {
      setPinLoading(false);
    }
  };

  if (loading) return <div className={styles.spinner} />;

  return (
    <div>
      <h2 className={styles.heading}>Available Quizzes</h2>
      {error && <p className={styles.error}>{error}</p>}
      {!error && quizzes.length === 0 && <p className={styles.empty}>No quizzes available.</p>}

      <div className={styles.grid}>
        {quizzes.map(q => {
          const done = attempted.has(q._id);
          return (
            <div key={q._id} className={`${styles.card} ${done ? styles.cardDone : ''}`}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{q.title}</h3>
                {done
                  ? <span className={styles.doneBadge}>✓ Attempted</span>
                  : q.hasPin && <span className={styles.pinBadge}>🔒 PIN Required</span>
                }
              </div>
              {q.description && <p className={styles.cardDesc}>{q.description}</p>}
              <div className={styles.cardMeta}>
                <span className={styles.pill}>{q.totalQuestions} questions</span>
                <span className={styles.pill}>{q.timeLimit ? `${q.timeLimit} min` : 'No limit'}</span>
              </div>
              <button
                className={`${styles.btn} ${done ? styles.btnDone : ''}`}
                onClick={() => handleStart(q)}
                disabled={done}
              >
                {done ? 'Already Attempted' : q.hasPin ? '🔒 Unlock & Start' : 'Start Quiz →'}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── PIN Modal ── */}
      {pinModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>🔒</div>
            <h3 className={styles.modalTitle}>Enter Quiz PIN</h3>
            <p className={styles.modalDesc}>
              <strong>{pinModal.title}</strong> is PIN-protected.<br />
              Ask your admin for the PIN to unlock it.
            </p>
            <form onSubmit={handlePinSubmit} className={styles.modalForm}>
              <input
                className={`${styles.pinInput} ${pinError ? styles.pinInputError : ''}`}
                type="text"
                placeholder="Enter PIN"
                value={pin}
                onChange={e => { setPin(e.target.value); setPinError(''); }}
                autoFocus
                maxLength={20}
              />
              {pinError && <p className={styles.pinError}>{pinError}</p>}
              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setPinModal(null)}>
                  Cancel
                </button>
                <button type="submit" className={styles.btnUnlock} disabled={pinLoading}>
                  {pinLoading ? 'Verifying...' : 'Unlock →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
