import styles from './Quiz.module.css';

export default function ProgressSteps({ total, current, answers, questions }) {
  return (
    <div className={styles.stepsWrapper}>
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        const isCompleted = answers[questions[i]?._id] !== undefined && i !== current;
        return (
          <div key={i} className={styles.step}>
            <div className={`${styles.stepNum} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </div>
            {i < total - 1 && (
              <div className={`${styles.stepLine} ${isCompleted ? styles.completed : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
