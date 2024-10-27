'use client';

import { Suspense, useState } from 'react';

import ServerComponentB from './component-b';

export default function ClientComponentA() {
  const [counter, setCounter] = useState(0); // State in Client A

  return (
    <div>
      <h1>Client Component A</h1>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>
        Increment Counter in A
      </button>

      {/* Pass state and setter down to Server Component B */}
      <Suspense fallback={<div>Loading...</div>}>
        <ServerComponentB counter={counter} setCounter={setCounter} />
      </Suspense>
    </div>
  );
}
