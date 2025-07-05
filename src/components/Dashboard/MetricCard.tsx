import { motion, animate } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  color: string;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  index,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      onUpdate(latest) {
        setAnimatedValue(latest);
      },
    });
    return () => controls.stop();
  }, [value]);

  const formatValue = (val: number) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
    return val.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div
          className={`text-sm font-medium ${
            change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {change >= 0 ? '+' : ''}
          {change}%
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{formatValue(animatedValue)}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;
