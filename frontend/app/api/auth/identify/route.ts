import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('access_token');

    if (!cookie) {
      return NextResponse.json({
        message: 'User not logged in',
        isLoggedin: false,
      });
    }

    const response = await fetch('http://localhost:8080/api/user/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie?.value}`,
      },
      credentials: 'include',
    });

    const data = await response.json();
    return NextResponse.json({ user: data.user, isLoggedIn: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
