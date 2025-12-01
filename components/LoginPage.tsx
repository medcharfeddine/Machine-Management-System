'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin, switchToRegister }: { onLogin: (username: string) => void; switchToRegister: () => void }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.username || !form.password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      onLogin(res.data.username);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="bg-gray-800 border border-blue-500 rounded-xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">Technician Login</h2>
        
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Username</label>
            <input
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
          Don't have an account?{' '}
          <button
            onClick={switchToRegister}
            className="text-blue-400 hover:text-blue-300 font-semibold transition"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
