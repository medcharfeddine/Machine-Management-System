'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EntryPage() {
  const [form, setForm] = useState({
    client: '',
    phone: '',
    type: '',
    brand: '',
    sn: '',
    technician: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-fill technician from logged-in user
    const username = localStorage.getItem('username');
    if (username) {
      setForm(prev => ({ ...prev, technician: username }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.sn || !form.client || !form.technician) {
      alert('Please ensure you are logged in. Serial number and client are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/machines', form);
      alert('Machine entered successfully!');
      setForm({ ...form, client: '', phone: '', type: '', brand: '', sn: '' });
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-blue-500 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Enter Machine</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Client *</label>
          <input
            name="client"
            placeholder="Client name"
            value={form.client}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
          <input
            name="type"
            placeholder="Machine type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Serial Number *</label>
          <input
            name="sn"
            placeholder="Serial number"
            value={form.sn}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Technician</label>
          <input
            type="text"
            value={form.technician}
            readOnly
            className="w-full px-4 py-2 bg-gray-600 border border-gray-600 rounded-lg text-white cursor-not-allowed"
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
      >
        {loading ? 'Entering...' : 'Enter Machine'}
      </button>
    </div>
  );
}
