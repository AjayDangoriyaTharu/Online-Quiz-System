import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import QuizLayout from '../components/quiz/QuizLayout';
import QuestionCard from '../components/quiz/QuestionCard';
import ResultScreen from '../components/quiz/ResultScreen';
import { MAX_VIOLATIONS, NO_TIME_LIMIT_SECONDS } from '../constants';
import styles from '../components/quiz/Quiz.module.css';

export default function QuizPage() {
  const { quizId } = useParams();

  const [questions, setQuestions]   = useState([]);
  const [timeLeft, setTimeLeft]     = useState(null);   // null until quiz loaded
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState({});
  const [submitted, setSubmitted]   = useState(false);
  const [result, setResult]         = useState(null);
  const [error, setError]           = useState('');
  const [direction, setDirection]   = useState('next');
  const [animKey, setAnimKey]       = useState(0);
  const [violations, setViolations] = useState(0);
  const [warning, setWarning]       = useState(null);

  const timerRef   = useRef(null);
  const warningRef = useRef(null);

  // ── Fullscreen ───────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    return () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // ── Prevent accidental page leave ────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  // ── Load quiz + questions ─────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [quizRes, questionsRes] = await Promise.all([
          api.get(`/quizzes/${quizId}`),
          api.get(`/questions/${quizId}`),
        ]);
        const limitMinutes = quizRes.data.timeLimit;
        // timeLimit 0 means no limit — use a large number (99 min)
        setTimeLeft(limitMinutes > 0 ? limitMinutes * 60 : NO_TIME_LIMIT_SECONDS);
        setQuestions(questionsRes.data);
      } catch {
        setError('Failed to load quiz. Please go back and try again.');
      }
    };
    load();
  }, [quizId]);

  // ── Countdown timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (submitted || timeLeft === null || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted, timeLeft === null, questions.length]); // eslint-disable-line

  // ── Anti-cheat violation handler ─────────────────────────────────────────
  const triggerViolation = useCallback((msg) => {
    if (submitted) return;
    setViolations(prev => {
      const next = prev + 1;
      const remaining = MAX_VIOLATIONS - next;
      setWarning(remaining <= 0
        ? { message: '🚫 Too many violations! Quiz auto-submitted.', count: 0, fatal: true }
        : { message: msg, count: remaining, fatal: false }
      );
      clearTimeout(warningRef.current);
      warningRef.current = setTimeout(() => setWarning(null), 3000);
      return next;
    });
  }, [submitted]);

  // ── Auto-submit on fatal violation ───────────────────────────────────────
  useEffect(() => {
    if (!warning?.fatal) return;
    const t = setTimeout(() => handleSubmit(), 2000);
    return () => clearTimeout(t);
  }, [warning]); // eslint-disable-line

  // ── Anti-cheat: fullscreen exit ───────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement && !submitted) {
        document.documentElement.requestFullscreen().catch(() => {});
        triggerViolation('⚠️ Fullscreen exit detected!');
      }
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [submitted, triggerViolation]);

  // ── Anti-cheat: tab switch ────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => {
      if (document.hidden && !submitted)
        triggerViolation('⚠️ Tab switch detected! Stay on this page.');
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [submitted, triggerViolation]);

  // ── Anti-cheat: block right-click, copy, devtools ────────────────────────
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        triggerViolation('⚠️ Developer tools are not allowed!');
      }
    };
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('copy', prevent);
    document.addEventListener('paste', prevent);
    document.addEventListener('cut', prevent);
    window.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('copy', prevent);
      document.removeEventListener('paste', prevent);
      document.removeEventListener('cut', prevent);
      window.removeEventListener('keydown', blockKeys);
    };
  }, [triggerViolation]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (submitted) return;
      if (e.key === 'ArrowRight' && answers[questions[current]?._id]) handleNext();
      if (e.key === 'ArrowLeft' && current > 0) handlePrev();
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (keyMap[e.key] !== undefined && questions[current]) {
        const opt = questions[current].options[keyMap[e.key]];
        if (opt) handleSelect(questions[current]._id, opt);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, questions, answers, submitted]); // eslint-disable-line

  const handleSelect = (questionId, option) =>
    setAnswers(prev => ({ ...prev, [questionId]: option }));

  const handleNext = () => {
    if (current < questions.length - 1) {
      setDirection('next');
      setAnimKey(k => k + 1);
      setCurrent(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setDirection('prev');
      setAnimKey(k => k + 1);
      setCurrent(c => c - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    clearInterval(timerRef.current);
    try {
      const { data } = await api.post('/results/submit', { quizId, answers });
      setResult(data);
      setSubmitted(true);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quiz.');
    }
  }, [quizId, answers]);

  const handleExpire = useCallback(() => handleSubmit(), [handleSubmit]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (error) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0f0c29' }}>
      <p style={{ color:'#f87171', fontSize:'1.1rem', textAlign:'center', padding:'0 24px' }}>{error}</p>
    </div>
  );

  if (timeLeft === null || questions.length === 0) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0f0c29' }}>
      <div style={{ width:48, height:48, border:'4px solid rgba(255,255,255,0.1)', borderTopColor:'#7c3aed', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
    </div>
  );

  if (submitted && result)
    return <ResultScreen score={result.score} totalQuestions={result.totalQuestions} percentage={result.percentage} />;

  const isLast = current === questions.length - 1;
  const currentAnswer = answers[questions[current]?._id];

  return (
    <>
      {warning && (
        <div className={`${styles.warningOverlay} ${warning.fatal ? styles.warningFatal : ''}`}>
          <div className={styles.warningBox}>
            <p className={styles.warningMsg}>{warning.message}</p>
            {!warning.fatal && (
              <p className={styles.warningCount}>
                {warning.count} warning{warning.count !== 1 ? 's' : ''} remaining before auto-submit
              </p>
            )}
          </div>
        </div>
      )}

      {violations > 0 && !submitted && (
        <div className={styles.violationBadge}>
          ⚠️ {violations}/{MAX_VIOLATIONS} violations
        </div>
      )}

      <QuizLayout
        timeLeft={timeLeft}
        onExpire={handleExpire}
        total={questions.length}
        current={current}
        answers={answers}
        questions={questions}
      >
        <QuestionCard
          key={animKey}
          question={questions[current]}
          index={current}
          total={questions.length}
          selected={currentAnswer}
          onSelect={handleSelect}
          direction={direction}
        />

        <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:12 }}>
          <div className={styles.navButtons}>
            <button className={styles.btnPrev} onClick={handlePrev} disabled={current === 0}>
              ← Prev
            </button>
            {isLast ? (
              <button className={styles.btnSubmit} onClick={handleSubmit}>
                Submit Quiz ✓
              </button>
            ) : (
              <button className={styles.btnNext} onClick={handleNext} disabled={!currentAnswer}>
                Next →
              </button>
            )}
          </div>
          {!currentAnswer && !isLast && (
            <p style={{ color:'#f59e0b', fontSize:'0.78rem', margin:0, textAlign:'center' }}>
              Select an answer to continue
            </p>
          )}
        </div>
      </QuizLayout>
    </>
  );
}
