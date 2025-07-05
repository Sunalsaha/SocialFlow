import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Sparkles } from 'lucide-react';

const engagementData = [
  { day: 'Mon', engagement: 3.1 },
  { day: 'Tue', engagement: 4.3 },
  { day: 'Wed', engagement: 2.8 },
  { day: 'Thu', engagement: 5.0 },
  { day: 'Fri', engagement: 4.7 },
  { day: 'Sat', engagement: 6.2 },
  { day: 'Sun', engagement: 5.9 },
];

const getAIInsight = () => {
  const avg =
    engagementData.reduce((sum, d) => sum + d.engagement, 0) /
    engagementData.length;

  if (avg < 3) {
    return {
      message: '🌱 Budding – Try posting engaging Reels or ask questions in captions!',
      status: 'low',
    };
  } else if (avg < 5) {
    return {
      message: '🌿 Growing – You’re on the right track. Try boosting a top post!',
      status: 'medium',
    };
  } else {
    return {
      message: '🌸 Blooming – Excellent work! Keep up the consistent content!',
      status: 'high',
    };
  }
};

const EngagementChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300">{`${label}`}</p>
          <p className="text-purple-400 font-semibold">
            {`Engagement: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const ai = getAIInsight();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Engagement Rate</h3>

      {/* AI Insight Banner */}
      <div className="mb-4 p-3 bg-slate-700/40 text-blue-300 text-sm rounded-md border border-slate-600 flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span>{ai.message}</span>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="engagement"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EngagementChart;
