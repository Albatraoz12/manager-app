'use client';
import { useEffect, useState } from 'react';

export default function page() {
  const [userData, setUserData] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const userInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/identify');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userInfo();
      if (data && Object.keys(data).length > 0) {
        setUserData(data);
      } else {
        setErrorMsg('No user Found');
      }
    };

    fetchUserData();
  }, []);

  return (
    <section>
      <h1>Dashboard</h1>

      {userData ? (
        <h2>{userData.firstName || 'Guest'}</h2>
      ) : (
        <h2>{errorMsg}</h2>
      )}
    </section>
  );
}
