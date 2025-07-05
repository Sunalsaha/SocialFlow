
import { motion } from 'framer-motion';
import { Filter, Calendar } from 'lucide-react';

interface FilterBarProps {
  selectedPlatform: string;
  selectedTimeframe: string;
  onPlatformChange: (platform: string) => void;
  onTimeframeChange: (timeframe: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  selectedTimeframe,
  onPlatformChange,
  onTimeframeChange
}) => {
  const platforms = ['All', 'Instagram', 'YouTube', 'Facebook'];
  const timeframes = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-400" />
          <span className="text-white font-medium">Filters</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Platform Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Platform:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => onPlatformChange(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <select
              value={selectedTimeframe}
              onChange={(e) => onTimeframeChange(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe} value={timeframe}>{timeframe}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
