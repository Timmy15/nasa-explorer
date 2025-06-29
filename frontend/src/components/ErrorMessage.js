import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = 'Something went wrong', 
  message = 'An unexpected error occurred. Please try again.' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-space-black via-red-900/20 to-orange-900/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto"
            >
              <AlertTriangle className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Pulsing ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 border-2 border-red-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {message}
            </p>
          </div>

          {/* Error Details */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-4 rounded-lg border border-red-500/20"
            >
              <details className="text-left">
                <summary className="text-red-400 font-semibold cursor-pointer hover:text-red-300 transition-colors">
                  Error Details
                </summary>
                <div className="mt-2 text-sm text-gray-400 font-mono bg-black/20 p-3 rounded border border-white/10">
                  {error.message || error.toString()}
                </div>
              </details>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </motion.button>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-nasa-blue to-nasa-red hover:from-nasa-blue/80 hover:to-nasa-red/80 text-white rounded-lg font-semibold transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorMessage; 