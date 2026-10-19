import { useEffect, useState } from 'react';
import { laravelApi } from '../axios';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    laravelApi.get('/user', { signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setUser(response.data);
        }
      })
      .catch((requestError) => {
        if (controller.signal.aborted) {
          return;
        }

        if (requestError.response?.status === 401) {
          setUser(null);
        } else {
          setError('Unable to check the current user.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { user, loading, error, isAuthenticated: Boolean(user) };
}

export default useAuth;
