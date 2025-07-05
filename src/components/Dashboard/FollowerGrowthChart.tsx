import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMemo } from 'react';
import { Sparkles } from 'lucide-react';

const followerData = [
  { date: 'Mon', followers: 120 },
  { date: 'Tue', followers: 200 },
  { date: 'Wed', followers: 350 },
  { date: 'Thu', followers: 500 },
  { date: 'Fri', followers: 700 },
  { date: 'Sat', followers: 1000 },
  { date: 'Sun', followers: 1300 },
];

const FollowerGrowthChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300">{`${label}`}</p>
          <p className="text-blue-400 font-semibold">
            {`Followers: ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // 🧠 AI Assistant Insight Logic
  const aiInsight = useMemo(() => {
    const diffs = followerData.map((_, i) =>
      i > 0 ? followerData[i].followers - followerData[i - 1].followers : 0
    ).slice(1);

    const avgGrowth = diffs.reduce((sum, val) => sum + val, 0) / diffs.length;

    if (avgGrowth > 200) return "🌱 You're experiencing strong follower growth!";
    if (avgGrowth > 100) return "📈 Growth is steady. Keep up the good content!";
    return "⚠️ Growth is slowing. Try experimenting with new posts or reels.";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Follower Growth</h3>

      {/* AI Assistant Insight */}
      <div className="flex items-center text-sm text-blue-300 bg-slate-700/50 p-3 rounded-lg border border-slate-600 mb-4">
        <Sparkles className="w-4 h-4 mr-2 text-blue-400 animate-pulse" />
        <span>{aiInsight}</span>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={followerData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FollowerGrowthChart;
