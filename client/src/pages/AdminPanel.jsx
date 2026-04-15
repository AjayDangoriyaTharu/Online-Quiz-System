import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useAdminData } from '../hooks/useAdminData';
import { formatDate } from '../utils/format';
import { GRADE_COLOR } from '../constants';
import styles from './AdminPanel.module.css';

const TABS = [
  { key: 'quizzes',     label: '📋 Quizzes' },
  { key: 'questions',   label: '❓ Questions' },
  { key: 'results',     label: '📊 Results' },
  { key: 'leaderboard', label: '🏆 Leaderboard' },
];

const EMPTY_QUIZ_FORM     = { title: '', description: '', timeLimit: '', pin: '' };
const EMPTY_QUESTION_FORM = { quizId: '', questionText: '', options: ['', '', '', ''], correctAnswer: '' };

export default function AdminPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'quizzes';

  const { quizzes, results, fetchQuizzes } = useAdminData();

  const [quizForm, setQuizForm]         = useState(EMPTY_QUIZ_FORM);
  const [questionForm, setQuestionForm] = useState(EMPTY_QUESTION_FORM);
  const [leaderboard, setLeaderboard]   = useState([]);
  const [lbQuizId, setLbQuizId]         = useState('');
  const [lbLoading, setLbLoading]       = useState(false);
  const [msg, setMsg]   = useState('');
  const [error, setError] = useState('');

  const notify = (m, isError = false) => {
    isError ? setError(m) : setMsg(m);
    setTimeout(() => { setMsg(''); setError(''); }, 3000);
  };

  const fetchLeaderboard = async (quizId) => {
    if (!quizId) return;
    setLbLoading(true);
    try {
      const { data } = await api.get(`/results/leaderboard/${quizId}`);
      setLeaderboard(data);
    } catch {
      notify('Failed to load leaderboard', true);
    } finally {
      setLbLoading(false);
    }
  };

  const createQuiz = async (e) => {
    e.preventDefault();
    try {
      await api.post('/quizzes', quizForm);
      setQuizForm(EMPTY_QUIZ_FORM);
      fetchQuizzes();
      notify('Quiz created successfully!');
    } catch (err) {
      notify(err.response?.data?.error || 'Failed to create quiz', true);
    }
  };

  const deleteQuiz = async (id) => {
    if (!confirm('Delete this quiz?')) return;
    try {
      await api.delete(`/quizzes/${id}`);
      fetchQuizzes();
      notify('Quiz deleted.');
    } catch {
      notify('Failed to delete quiz', true);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/questions', questionForm);
      setQuestionForm(EMPTY_QUESTION_FORM);
      fetchQuizzes();
      notify('Question added successfully!');
    } catch (err) {
      notify(err.response?.data?.error || 'Failed to add question', true);
    }
  };

  const updateOption = (i, val) => {
    const opts = [...questionForm.options];
    opts[i] = val;
    setQuestionForm({ ...questionForm, options: opts });
  };

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <h1 className={styles.title}>Admin Panel</h1>
        <p className={styles.subtitle}>Manage quizzes, questions, results and leaderboards</p>
      </div>

      {msg   && <div className={styles.toast}>{msg}</div>}
      {error && <div className={`${styles.toast} ${styles.toastError}`}>{error}</div>}

      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setSearchParams({ tab: t.key })}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>

        {/* ══ QUIZZES ══ */}
        {tab === 'quizzes' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Create New Quiz</h2>
              <form onSubmit={createQuiz} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Quiz Title *</label>
                    <input className={styles.input} placeholder="e.g. JavaScript Basics"
                      value={quizForm.title} onChange={e => setQuizForm({ ...quizForm, title: e.target.value })} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Time Limit (minutes)</label>
                    <input className={styles.input} type="number" placeholder="0 = no limit"
                      value={quizForm.timeLimit} onChange={e => setQuizForm({ ...quizForm, timeLimit: e.target.value })} />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <input className={styles.input} placeholder="Short description"
                    value={quizForm.description} onChange={e => setQuizForm({ ...quizForm, description: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Quiz PIN <span className={styles.hint}>(leave blank for no PIN)</span></label>
                  <input className={styles.input} placeholder="e.g. 1234"
                    value={quizForm.pin} onChange={e => setQuizForm({ ...quizForm, pin: e.target.value })} />
                </div>
                <button className={styles.btnPrimary} type="submit">+ Create Quiz</button>
              </form>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>All Quizzes <span className={styles.count}>{quizzes.length}</span></h2>
              {quizzes.length === 0
                ? <p className={styles.empty}>No quizzes yet.</p>
                : (
                  <div className={styles.quizList}>
                    {quizzes.map(q => (
                      <div key={q._id} className={styles.quizRow}>
                        <div className={styles.quizInfo}>
                          <span className={styles.quizTitle}>{q.title}</span>
                          <span className={styles.quizMeta}>
                            <span className={styles.pill}>{q.totalQuestions} questions</span>
                            <span className={styles.pill}>{q.timeLimit ? `${q.timeLimit} min` : 'No limit'}</span>
                            {q.hasPin && <span className={styles.pillPin}>🔒 PIN Protected</span>}
                          </span>
                        </div>
                        <button className={styles.btnDelete} onClick={() => deleteQuiz(q._id)}>🗑 Delete</button>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        )}

        {/* ══ QUESTIONS ══ */}
        {tab === 'questions' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Add Question</h2>
              <form onSubmit={addQuestion} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Select Quiz *</label>
                  <select className={styles.input} value={questionForm.quizId}
                    onChange={e => setQuestionForm({ ...questionForm, quizId: e.target.value })} required>
                    <option value="">— Choose a quiz —</option>
                    {quizzes.map(q => <option key={q._id} value={q._id}>{q.title}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Question Text *</label>
                  <input className={styles.input} placeholder="Enter the question"
                    value={questionForm.questionText}
                    onChange={e => setQuestionForm({ ...questionForm, questionText: e.target.value })} required />
                </div>
                <div className={styles.optionsGrid}>
                  {questionForm.options.map((opt, i) => (
                    <div key={i} className={styles.formGroup}>
                      <label className={styles.label}>Option {i + 1} *</label>
                      <input className={styles.input} placeholder={`Option ${i + 1}`}
                        value={opt} onChange={e => updateOption(i, e.target.value)} required />
                    </div>
                  ))}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Correct Answer * <span className={styles.hint}>(must match one option)</span></label>
                  <select className={styles.input} value={questionForm.correctAnswer}
                    onChange={e => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })} required>
                    <option value="">— Select correct option —</option>
                    {questionForm.options.filter(o => o.trim()).map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <button className={styles.btnPrimary} type="submit">+ Add Question</button>
              </form>
            </div>
          </div>
        )}

        {/* ══ RESULTS ══ */}
        {tab === 'results' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>All Attempts <span className={styles.count}>{results.length}</span></h2>
              {results.length === 0
                ? <p className={styles.empty}>No quiz attempts yet.</p>
                : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr><th>Student</th><th>Quiz</th><th>Score</th><th>Percentage</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {results.map(r => (
                          <tr key={r._id}>
                            <td>
                              <div className={styles.userCell}>
                                <div className={styles.userAvatar}>{r.userId?.name?.[0]?.toUpperCase()}</div>
                                {r.userId?.name}
                              </div>
                            </td>
                            <td>{r.quizId?.title}</td>
                            <td><span className={styles.scoreBadge}>{r.score}/{r.totalQuestions}</span></td>
                            <td>
                              <div className={styles.percentCell}>
                                <div className={styles.percentBar}>
                                  <div className={styles.percentFill}
                                    style={{ width: `${r.percentage}%`, background: GRADE_COLOR(r.percentage) }} />
                                </div>
                                <span>{r.percentage?.toFixed(1)}%</span>
                              </div>
                            </td>
                            <td className={styles.dateCell}>{formatDate(r.submittedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          </div>
        )}

        {/* ══ LEADERBOARD ══ */}
        {tab === 'leaderboard' && (
          <div className={styles.tabContent}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>🏆 Leaderboard</h2>
              <div className={styles.formGroup} style={{ maxWidth: 360 }}>
                <label className={styles.label}>Select Quiz</label>
                <select className={styles.input} value={lbQuizId}
                  onChange={e => { setLbQuizId(e.target.value); setLeaderboard([]); fetchLeaderboard(e.target.value); }}>
                  <option value="">— Choose a quiz —</option>
                  {quizzes.map(q => <option key={q._id} value={q._id}>{q.title}</option>)}
                </select>
              </div>
              {lbLoading && <div className={styles.spinner} />}
              {!lbLoading && lbQuizId && leaderboard.length === 0 && (
                <p className={styles.empty}>No attempts for this quiz yet.</p>
              )}
              {leaderboard.length > 0 && (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead><tr><th>Rank</th><th>Student</th><th>Score</th></tr></thead>
                    <tbody>
                      {leaderboard.map(entry => (
                        <tr key={entry.rank} className={entry.rank <= 3 ? styles.topRow : ''}>
                          <td><span className={styles.rank}>
                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                          </span></td>
                          <td>
                            <div className={styles.userCell}>
                              <div className={styles.userAvatar}>{entry.userName?.[0]?.toUpperCase()}</div>
                              {entry.userName}
                            </div>
                          </td>
                          <td><span className={styles.scoreBadge}>{entry.score}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
