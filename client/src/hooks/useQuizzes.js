import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Fetches all quizzes and the current user's attempted quiz IDs.
 */
export const useQuizzes = (userId) => {
  const [quizzes, setQuizzes]   = useState([]);
  const [attempted, setAttempted] = useState(new Set());
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [quizRes, resultRes] = await Promise.all([
          api.get('/quizzes'),
          api.get(`/results/user/${userId}`),
        ]);
        setQuizzes(quizRes.data);
        setAttempted(new Set(resultRes.data.map(r => r.quizId?._id || r.quizId)));
      } catch {
        setError('Failed to load quizzes.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  return { quizzes, attempted, loading, error };
};
