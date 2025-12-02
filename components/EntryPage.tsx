'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const machineTypes = ['imprimante', 'pc fix', 'pc portable', 'photocopie', 'videoprojecteur', 'onduleur', 'machine a calculer'];
const brands = ['HP', 'Dell', 'Lenovo', 'Canon', 'Xerox', 'Epson', 'Brother', 'Samsung', 'LG', 'Acer', 'ASUS', 'Sony', 'Panasonic', 'Other'];
const tunisianStates = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 
  'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 
  'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 
  'Tozeur', 'Tunis', 'Zaghouan'
];

export default function EntryPage() {
  const [form, setForm] = useState({
    client: '',
    phone: '',
    type: '',
    brand: '',
    region: '',
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
      setForm({ ...form, client: '', phone: '', type: '', brand: '', region: '', sn: '' });
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="bg-gray-800 border border-blue-500 rounded-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Enter Machine</h2>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Client *</label>
          <input
            name="client"
            placeholder="Client name"
            value={form.client}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Phone</label>
          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Type *</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select machine type</option>
            {machineTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Brand *</label>
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select brand</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Region *</label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select region</option>
            {tunisianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Serial Number *</label>
          <input
            name="sn"
            placeholder="Serial number"
            value={form.sn}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Technician</label>
          <input
            type="text"
            value={form.technician}
            readOnly
            className="w-full px-3 sm:px-4 py-2 bg-gray-600 border border-gray-600 rounded-lg text-white text-sm cursor-not-allowed"
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 text-sm sm:text-base"
      >
        {loading ? 'Entering...' : 'Enter Machine'}
      </button>
    </div>
  );
}
