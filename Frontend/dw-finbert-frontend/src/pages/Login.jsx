import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/token/', { username, password });
      login(res.data.access, res.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Invalid credentials or server unavailable.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-primary min-h-screen text-white flex justify-center items-center py-12">
      <form onSubmit={handleLogin} className="bg-soft p-8 rounded-2xl max-w-sm w-full shadow-2xl ring-1 ring-accent/20">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to DW-FinBERT</h2>
        {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-500/10 py-2 rounded px-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2 text-sm">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2 text-sm">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-accent outline-none" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-accent text-black font-bold py-2 rounded-lg hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center mt-4 text-gray-400 text-sm">Don't have an account? <Link to="/signup" className="text-accent underline hover:opacity-80">Sign Up</Link></p>
      </form>
    </div>
  );
}
