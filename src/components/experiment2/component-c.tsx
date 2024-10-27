'use client';

export default function ClientComponentC({ counter, setCounter }) {
  const handleClick = () => setCounter(counter + 1);

  return (
    <div>
      <h3>Client Component C</h3>
      <p>Counter in C: {counter}</p>
      <button onClick={handleClick}>Increment Counter in C</button>
    </div>
  );
}
