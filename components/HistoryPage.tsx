'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Repair {
  _id?: string;
  date: string;
  note: string;
  tech: string;
}

interface Machine {
  _id: string;
  sn: string;
  client: string;
  phone: string;
  type: string;
  brand: string;
  technician: string;
  status: string;
  entry: string;
  exit?: string;
  repairs: Repair[];
}

export default function HistoryPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filterTech, setFilterTech] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [repairsModalOpen, setRepairsModalOpen] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [repairNote, setRepairNote] = useState('');
  const [editingRepairId, setEditingRepairId] = useState<string | null>(null);
  const [editingRepairText, setEditingRepairText] = useState('');
  const [loggedInTech, setLoggedInTech] = useState<string>('');

  const technicians = ['', 'Ahmed', 'Mohamed', 'Youssef', 'Sami', 'Oussama'];
  const statuses = ['', 'In', 'Out'];

  useEffect(() => {
    // Get logged-in technician from localStorage
    const username = localStorage.getItem('username');
    if (username) {
      setLoggedInTech(username);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/machines', {
        params: {
          technician: filterTech || undefined,
          status: filterStatus || undefined
        }
      });
      setMachines(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching machines:', err);
      setMachines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterTech, filterStatus]);

  const markExit = async (id: string) => {
    try {
      await axios.put(`/api/machines/${id}/exit`);
      fetchData();
    } catch (err) {
      console.error('Error marking exit:', err);
      alert('Error marking exit');
    }
  };

  const handleAddRepair = (id: string) => {
    setSelectedMachineId(id);
    setRepairNote('');
    setEditingRepairId(null);
    setModalOpen(true);
  };

  const handleViewRepairs = (machine: Machine) => {
    setSelectedMachine(machine);
    setRepairsModalOpen(true);
  };

  const handleEditRepair = (repairId: string, repairText: string) => {
    setEditingRepairId(repairId);
    setEditingRepairText(repairText);
  };

  const submitEditRepair = async () => {
    if (!editingRepairText.trim() || !selectedMachine || !editingRepairId) {
      alert('Please enter repair text');
      return;
    }

    try {
      await axios.put(`/api/machines/${selectedMachine._id}/repair/${editingRepairId}`, {
        note: editingRepairText
      });
      fetchData();
      if (selectedMachine) {
        // Re-fetch the selected machine to update the display
        const res = await axios.get(`/api/machines`);
        const updated = (res.data as Machine[]).find(m => m._id === selectedMachine._id);
        if (updated) setSelectedMachine(updated);
      }
      setEditingRepairId(null);
      setEditingRepairText('');
    } catch (err) {
      console.error('Error updating repair:', err);
      alert('Error updating repair');
    }
  };

  const deleteRepair = async (repairId: string) => {
    if (!selectedMachine) return;
    if (!window.confirm('Are you sure you want to delete this repair?')) return;

    try {
      await axios.delete(`/api/machines/${selectedMachine._id}/repair/${repairId}`);
      fetchData();
      if (selectedMachine) {
        const res = await axios.get(`/api/machines`);
        const updated = (res.data as Machine[]).find(m => m._id === selectedMachine._id);
        if (updated) setSelectedMachine(updated);
      }
    } catch (err) {
      console.error('Error deleting repair:', err);
      alert('Error deleting repair');
    }
  };

  const submitRepair = async () => {
    if (!repairNote.trim() || !selectedMachineId) {
      alert('Please enter a repair note');
      return;
    }

    try {
      await axios.post(`/api/machines/${selectedMachineId}/repair`, {
        note: repairNote,
        tech: loggedInTech
      });
      fetchData();
      setModalOpen(false);
      setRepairNote('');
    } catch (err) {
      console.error('Error adding repair:', err);
      alert('Error adding repair');
    }
  };

  return (
    <div className="bg-gray-800 border border-blue-500 rounded-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Machine History</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Technician</label>
          <select
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            {technicians.map((t) => (
              <option key={t} value={t}>
                {t || 'All'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s || 'All'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table/Cards */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : machines.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No machines found</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-600 text-gray-300">
                  <th className="px-2 sm:px-4 py-3 text-left">SN</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Client</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Type</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Tech</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Status</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Entry Date</th>
                  <th className="px-2 sm:px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((m) => (
                  <tr key={m._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-2 sm:px-4 py-3">{m.sn}</td>
                    <td className="px-2 sm:px-4 py-3">{m.client}</td>
                    <td className="px-2 sm:px-4 py-3">{m.type}</td>
                    <td className="px-2 sm:px-4 py-3">{m.technician}</td>
                    <td className="px-2 sm:px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        m.status === 'In' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-400">
                      {new Date(m.entry).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-center space-x-1 sm:space-x-2 flex justify-center flex-wrap gap-1">
                      {m.status === 'In' && (
                        <button
                          onClick={() => markExit(m._id)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 sm:px-3 py-1 rounded text-xs transition whitespace-nowrap"
                        >
                          Exit
                        </button>
                      )}
                      <button
                        onClick={() => handleViewRepairs(m)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-3 py-1 rounded text-xs transition whitespace-nowrap"
                      >
                        R ({m.repairs.length})
                      </button>
                      <button
                        onClick={() => handleAddRepair(m._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded text-xs transition"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {machines.map((m) => (
              <div key={m._id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{m.sn}</p>
                    <p className="text-xs text-gray-400">{m.client}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                    m.status === 'In' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {m.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <p className="text-gray-400">Type</p>
                    <p className="text-white">{m.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Tech</p>
                    <p className="text-white">{m.technician}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Repairs</p>
                    <p className="text-white">{m.repairs.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Entry</p>
                    <p className="text-white">{new Date(m.entry).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {m.status === 'In' && (
                    <button
                      onClick={() => markExit(m._id)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-2 rounded text-xs transition font-semibold"
                    >
                      Exit
                    </button>
                  )}
                  <button
                    onClick={() => handleViewRepairs(m)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-2 rounded text-xs transition font-semibold"
                  >
                    View Repairs
                  </button>
                  <button
                    onClick={() => handleAddRepair(m._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded text-xs transition font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Repair Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-gray-800 border border-blue-500 rounded-t-xl sm:rounded-xl p-4 sm:p-6 w-full sm:max-w-md sm:mx-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Add Repair Note</h3>
            <textarea
              value={repairNote}
              onChange={(e) => setRepairNote(e.target.value)}
              placeholder="Describe the repair performed..."
              rows={4}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none mb-4"
            />
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={submitRepair}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm sm:text-base"
              >
                Add Repair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View & Edit Repairs Modal */}
      {repairsModalOpen && selectedMachine && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 overflow-y-auto">
          <div className="bg-gray-800 border border-purple-500 rounded-t-xl sm:rounded-xl p-4 sm:p-6 w-full sm:max-w-2xl sm:mx-4 sm:my-8 max-h-96 sm:max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-2xl font-bold text-white">
                Repairs for {selectedMachine.sn}
              </h3>
              <button
                onClick={() => setRepairsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {selectedMachine.repairs.length === 0 ? (
              <p className="text-gray-400 py-8 text-center">No repairs recorded yet</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedMachine.repairs.map((repair, idx) => (
                  <div key={repair._id || idx} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">
                          {new Date(repair.date).toLocaleDateString()} at {new Date(repair.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {editingRepairId === repair._id ? (
                          <>
                            <button
                              onClick={submitEditRepair}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingRepairId(null)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditRepair(repair._id || `repair-${idx}`, repair.note)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteRepair(repair._id || `repair-${idx}`)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingRepairId === repair._id ? (
                      <textarea
                        value={editingRepairText}
                        onChange={(e) => setEditingRepairText(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white whitespace-pre-wrap">{repair.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setRepairsModalOpen(false)}
              className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
