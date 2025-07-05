import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Mail, User, Instagram, Facebook, Youtube } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    email: 'user@example.com',
    password: '',
    newPassword: '',
    bio: '',
    facebook: '',
    youtube: '',
    instagram: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend API here
    alert('Profile updated!');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
            />
          </div>

          {/* Change Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Current Password
              </label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4" /> New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
              <User className="w-4 h-4" /> Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none resize-none"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-500" /> Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={profile.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" /> YouTube
              </label>
              <input
                type="url"
                name="youtube"
                value={profile.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/yourchannel"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" /> Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={profile.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
