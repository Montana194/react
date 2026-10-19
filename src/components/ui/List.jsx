import { useEffect, useState } from 'react';
import api from '../../api/axios';

function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    api.get('/users', { signal: controller.signal })
      .then((response) => {
        if (!controller.signal.aborted) {
          setData(response.data);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('Unable to load users. Please try again later.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p role="status">Loading...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <ul aria-label="Users">
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default List;
