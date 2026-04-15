import styles from './Quiz.module.css';

const KEYS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, index, total, selected, onSelect, direction }) {
  return (
    <div className={`${styles.questionWrapper} ${direction === 'next' ? styles.slideInRight : styles.slideInLeft}`}>
      <div className={styles.questionHeader}>
        <span className={styles.questionBadge}>Q {index + 1} / {total}</span>
      </div>
      <p className={styles.questionTitle}>{question.questionText}</p>
      <div className={styles.optionsGrid}>
        {question.options.map((opt, i) => (
          <label
            key={opt}
            className={`${styles.optionLabel} ${selected === opt ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name={question._id}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(question._id, opt)}
            />
            <span className={styles.optionKey}>{KEYS[i]}</span>
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
