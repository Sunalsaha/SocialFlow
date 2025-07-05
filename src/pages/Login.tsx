import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { BarChart3, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
    } catch {
      toast.error('Invalid credentials. Try demo@example.com / password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <BarChart3 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">SocialFlow</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your analytics dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 space-y-6">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="demo@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-xs text-blue-400 mt-4">
          
            <h1 style={{ fontWeight: 'bold' }}>
  Demo Credentials — USE THIS FOR{' '}
  <span style={{ color: '#34d399' /* Tailwind green-400 */, fontWeight: 'bold' }}>
    EMAIL
  </span>{' '}
  AND{' '}
  <span style={{ color: '#34d399' /* Tailwind green-400 */, fontWeight: 'bold' }}>
    PASSWORD
  </span>
</h1>


            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
