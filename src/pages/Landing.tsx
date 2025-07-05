import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Cpu,
} from 'lucide-react';
import ai from '../../public/ai.png';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className="relative z-10 flex justify-between items-center px-6 py-4 border-b border-slate-700 backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold tracking-wide">SocialFlow</span>
        </div>
        <Link
          to="/login"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          Get Started
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Social Media Analytics
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Track, analyze, and optimize your social media performance across all platforms with real-time insights and beautiful visualizations.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>

              {/* Correct external link to public video */}
              <a
                href="/Recording.mp4"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-600 hover:border-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-slate-800"
              >
                Watch Demo
              </a>
            </motion.div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-20 left-10">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Instagram className="h-12 w-12 text-pink-400 opacity-60" />
            </motion.div>
          </div>
          <div className="absolute top-20 right-10">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Youtube className="h-12 w-12 text-red-400 opacity-60" />
            </motion.div>
          </div>
          <div className="absolute top-40 right-20">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <Twitter className="h-12 w-12 text-blue-400 opacity-60" />
            </motion.div>
          </div>
          <div className="absolute bottom-20 left-20">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <Facebook className="h-12 w-12 text-blue-600 opacity-60" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* AI Section */}
      <motion.section
        className="py-24 relative z-10 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${ai})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 bg-slate-900/60 backdrop-blur-md rounded-xl py-16">
          <motion.h2
            className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            AI-Powered Insights
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur p-10 rounded-xl border border-slate-700 text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <Cpu className="mx-auto text-blue-400 h-14 w-14 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Let AI Guide Your Strategy</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              SocialFlow uses advanced machine learning algorithms to analyze trends,
              identify engagement opportunities, and recommend the best times to post.
              Unlock the power of data-driven content planning and make every post count.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Powerful Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Real-time Analytics',
                description:
                  'Track your social media performance with live data and instant updates across all platforms.',
              },
              {
                icon: Users,
                title: 'Audience Insights',
                description:
                  'Understand your audience better with detailed demographics and engagement patterns.',
              },
              {
                icon: Zap,
                title: 'Automated Reports',
                description:
                  'Generate beautiful reports automatically and share insights with your team effortlessly.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-700 text-center text-sm">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} SocialFlow. All rights reserved. ·{' '}
          <Link to="#" className="hover:text-blue-400 underline">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link to="#" className="hover:text-blue-400 underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
