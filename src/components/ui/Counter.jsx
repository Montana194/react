import { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;
