import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft, Save, User, Mail, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';

export default function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/user/profile/');
        setProfileData({
          username: res.data.username || '',
          email: res.data.email || '',
          first_name: res.data.first_name || '',
          last_name: res.data.last_name || ''
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/api/user/profile/', profileData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = Object.values(err.response.data).flat();
        toast.error(errors.join(" ") || "Failed to update profile.");
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    }
    setLoading(false);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.put('/api/user/password/', passwordData);
      toast.success('Password updated successfully!');
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = Object.values(err.response.data).flat();
        toast.error(errors.join(" ") || "Failed to update password.");
      } else {
        toast.error('Failed to update password. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-900 text-slate-200 font-sans relative overflow-hidden p-6">
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-accent-neon opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto z-10 relative">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-accent-neon to-accent-blue p-3 rounded-xl text-black shadow-lg">
             <LayoutDashboard size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-wide text-white">Account Settings</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User size={20} className="text-accent-blue" />
              Profile Details
            </h2>
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">First Name</label>
                  <input type="text" name="first_name" value={profileData.first_name} onChange={handleProfileChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 text-sm">Last Name</label>
                  <input type="text" name="last_name" value={profileData.last_name} onChange={handleProfileChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-2 text-sm">Username</label>
                <input type="text" name="username" value={profileData.username} onChange={handleProfileChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" required />
              </div>
              <div>
                <label className="block text-slate-400 mb-2 text-sm flex items-center gap-2">
                  <Mail size={14} /> Email
                </label>
                <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-accent-blue text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2 mt-4 shadow-lg shadow-accent-blue/20">
                <Save size={18} /> {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock size={20} className="text-accent-neon" />
              Security
            </h2>
            <form onSubmit={updatePassword} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-2 text-sm">Current Password</label>
                <input type="password" name="old_password" value={passwordData.old_password} onChange={handlePasswordChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" required />
              </div>
              <div>
                <label className="block text-slate-400 mb-2 text-sm">New Password</label>
                <input type="password" name="new_password" value={passwordData.new_password} onChange={handlePasswordChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" required />
              </div>
              <div>
                <label className="block text-slate-400 mb-2 text-sm">Confirm New Password</label>
                <input type="password" name="confirm_password" value={passwordData.confirm_password} onChange={handlePasswordChange} className="w-full bg-brand-800 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent-neon outline-none text-white" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-accent-neon text-black font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2 mt-4 shadow-lg shadow-accent-neon/20">
                <Save size={18} /> {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
