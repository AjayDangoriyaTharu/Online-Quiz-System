import styles from './Quiz.module.css';
import Timer from './Timer';
import ProgressSteps from './ProgressSteps';

export default function QuizLayout({ children, timeLeft, totalSeconds, onExpire, total, current, answers, questions }) {
  return (
    <div className={styles.quizLayout}>
      <div className={styles.quizCard}>
        <Timer timeLeft={timeLeft} totalSeconds={totalSeconds} onExpire={onExpire} />
        {children}
        <ProgressSteps
          total={total}
          current={current}
          answers={answers}
          questions={questions}
        />
      </div>
    </div>
  );
}
