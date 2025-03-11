'use client';
import { useTokenContext } from './context/token-context';

export default function Home() {
  const { user } = useTokenContext();

  return (
    <section>
      <h1>Hello World!</h1>
    </section>
  );
}
