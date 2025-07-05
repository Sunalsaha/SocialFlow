import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Instagram,
  Youtube,
  Facebook,
  LogOut,
  UserCircle,
} from 'lucide-react';

import MetricCard from '../components/Dashboard/MetricCard';
import FilterBar from '../components/Dashboard/FilterBar';
import FollowerGrowthChart from '../components/Dashboard/FollowerGrowthChart';
import EngagementChart from '../components/Dashboard/EngagementChart';
import AIAssistant from './AIAssistant';
import AIChatAssistant from './AIChatAssistant';

const mockPlatforms = [
  {
    id: '1',
    name: 'Instagram',
    color: '#E1306C',
    icon: Instagram,
    metrics: {
      followers: 125000,
      likes: 5800,
      comments: 1200,
      shares: 430,
      impressions: 89000,
      engagementRate: 7.2,
    },
  },
  {
    id: '2',
    name: 'YouTube',
    color: 'red',
    icon: Youtube,
    metrics: {
      followers: 87000,
      likes: 3500,
      comments: 800,
      shares: 290,
      impressions: 67000,
      engagementRate: 5.4,
    },
  },
  {
    id: '3',
    name: 'Facebook',
    color: '#1877F2',
    icon: Facebook,
    metrics: {
      followers: 102000,
      likes: 4000,
      comments: 950,
      shares: 390,
      impressions: 72000,
      engagementRate: 6.1,
    },
  },
];

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('Last 7 Days');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const totalMetrics = mockPlatforms.reduce(
    (acc, platform) => ({
      followers: acc.followers + platform.metrics.followers,
      likes: acc.likes + platform.metrics.likes,
      comments: acc.comments + platform.metrics.comments,
      shares: acc.shares + platform.metrics.shares,
      impressions: acc.impressions + platform.metrics.impressions,
      engagementRate: acc.engagementRate + platform.metrics.engagementRate,
    }),
    {
      followers: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      impressions: 0,
      engagementRate: 0,
    }
  );

  const avgEngagementRate = parseFloat(
    (totalMetrics.engagementRate / mockPlatforms.length).toFixed(1)
  );

  const metrics = [
    {
      title: 'Total Followers',
      value: totalMetrics.followers,
      change: 12.5,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Likes',
      value: totalMetrics.likes,
      change: 8.3,
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Total Comments',
      value: totalMetrics.comments,
      change: 15.7,
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Shares',
      value: totalMetrics.shares,
      change: 5.2,
      icon: Share2,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Total Impressions',
      value: totalMetrics.impressions,
      change: 9.8,
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Avg Engagement Rate',
      value: avgEngagementRate,
      change: 3.4,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <motion.header
        className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Social Media Dashboard</h1>
            <p className="text-slate-400">Track your social media performance across all platforms</p>
          </div>

          <div className="relative z-50" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition"
            >
              <UserCircle className="h-6 w-6 text-white" />
            </button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-lg shadow-lg"
              >
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-4 py-2 text-white hover:bg-slate-700"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        <FilterBar
          selectedPlatform={selectedPlatform}
          selectedTimeframe={selectedTimeframe}
          onPlatformChange={setSelectedPlatform}
          onTimeframeChange={setSelectedTimeframe}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FollowerGrowthChart />
          <EngagementChart />
        </div>

        <AIAssistant
          data={{
            likes: totalMetrics.likes,
            comments: totalMetrics.comments,
            shares: totalMetrics.shares,
            impressions: totalMetrics.impressions,
            engagementRate: avgEngagementRate,
          }}
        />

        <AIChatAssistant />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mt-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Platform Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPlatforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-blue-500/50"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: platform.color }}>
                    <platform.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{platform.name}</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Followers</span>
                    <span className="text-white font-semibold">{platform.metrics.followers.toLocaleString()}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Engagement</span>
                      <span className="text-white font-semibold">{platform.metrics.engagementRate}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: platform.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${platform.metrics.engagementRate * 10}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
