import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Fetches quiz attempt results for a given user.
 */
export const useResults = (userId) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    api.get(`/results/user/${userId}`)
      .then(({ data }) => setResults(data))
      .catch(() => setError('Failed to load results.'))
      .finally(() => setLoading(false));
  }, [userId]);

  return { results, loading, error };
};
