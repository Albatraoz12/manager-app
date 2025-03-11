'use client';
import { useTokenContext } from '@/app/context/token-context';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useTokenContext();

  const signout = async () => {
    await fetch('http://localhost:8080/api/user/signout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
      credentials: 'include',
    });

    setIsLoggedIn(false);
  };

  return (
    <nav className='flex justify-between px-4 py-4 bg-black text-white'>
      <div>
        <Link href={'/'}>
          <h1>Task Manager</h1>
        </Link>
      </div>
      <div>
        <ul className='flex flex-row gap-3'>
          <li className='hidden md:block'>
            <Link href={'/'}>Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <button
                  type='button'
                  className='cursor-pointer rounded px-2 bg-red-400'
                  onClick={signout}
                >
                  Sign out
                </button>
              </li>
              <li>
                <Link href={'/auth/dashboard'}>Dashboard</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href={'/auth/signin'}>Sign in</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
