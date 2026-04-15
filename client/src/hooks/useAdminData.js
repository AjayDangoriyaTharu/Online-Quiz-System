import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Fetches all quizzes and all results for the admin panel.
 */
export const useAdminData = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);

  const fetchQuizzes = () =>
    api.get('/quizzes').then(({ data }) => setQuizzes(data));

  const fetchResults = () =>
    api.get('/results/all').then(({ data }) => setResults(data));

  useEffect(() => {
    fetchQuizzes();
    fetchResults();
  }, []);

  return { quizzes, results, fetchQuizzes, fetchResults };
};
