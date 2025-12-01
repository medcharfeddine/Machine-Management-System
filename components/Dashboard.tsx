'use client';

import { useState, useEffect } from 'react';
import EntryPage from './EntryPage';
import HistoryPage from './HistoryPage';

export default function Dashboard({ user, onLogout }: { user: string; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-blue-500 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Repair Management System</h1>
            <p className="text-gray-400 mt-1">Welcome, <span className="text-blue-400">{user}</span></p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entry Section */}
          <div className="lg:col-span-1">
            <EntryPage />
          </div>

          {/* History Section */}
          <div className="lg:col-span-2">
            <HistoryPage />
          </div>
        </div>
      </div>
    </div>
  );
}
