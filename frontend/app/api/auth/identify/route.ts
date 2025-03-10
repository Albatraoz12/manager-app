import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('access_token');

  const response = await fetch('http://localhost:8080/api/user/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie?.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return NextResponse.json(data.user);
}
