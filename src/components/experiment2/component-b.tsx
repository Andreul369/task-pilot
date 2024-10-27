import ClientComponentC from './component-c';

export default function ServerComponentB({ counter, setCounter }) {
  return (
    <div>
      <h2>Server Component B</h2>
      <p>Counter in B: {counter}</p>
      {/* Pass props to Client Component C */}
      <ClientComponentC counter={counter} setCounter={setCounter} />
    </div>
  );
}
