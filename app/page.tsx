'use client';

import { useState, useEffect } from 'react';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (username) {
      setUser(username);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;
  }

  if (!user) {
    return showRegister
      ? <RegisterPage switchToLogin={() => setShowRegister(false)} />
      : <LoginPage onLogin={setUser} switchToRegister={() => setShowRegister(true)} />;
  }

  return <Dashboard user={user} onLogout={() => {
    localStorage.clear();
    setUser(null);
  }} />;
}
