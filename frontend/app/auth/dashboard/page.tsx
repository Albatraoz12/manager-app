'use client';
import { useTokenContext } from '@/app/context/token-context';

export default function Page() {
  const { user } = useTokenContext();

  return (
    <section>
      <h1>Dashboard</h1>

      {user ? <h2>Hello {user.firstName}</h2> : <h2>Hello </h2>}
    </section>
  );
}
