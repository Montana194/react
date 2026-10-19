import { useState } from 'react';

function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with name:', name);
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
