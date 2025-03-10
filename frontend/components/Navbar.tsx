import Link from 'next/link';
import React from 'react';

export default function Navbar() {
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
          <li>
            <Link href={'/signin'}>Sign in</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
