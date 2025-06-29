import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ExternalLink, Star, Clock, User } from 'lucide-react';
import { useAPOD } from '../hooks/useNASA';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const APOD = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { data, isLoading, error, refetch } = useAPOD({ 
    date: selectedDate || undefined 
  });

  const apod = data?.data || data;

  if (isLoading) {
    return <LoadingSpinner text="Loading Astronomy Picture of the Day..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
        title="Failed to load APOD"
        message="Unable to fetch the Astronomy Picture of the Day."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-nasa-blue/10 to-cosmic-purple/10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6"
            >
              <Star className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold mb-6">
              <span className="bg-gradient-to-r from-stellar-yellow via-nasa-red to-cosmic-purple bg-clip-text text-transparent">
                Astronomy Picture of the Day
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured.
            </p>
            
            {/* Enhanced Date Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 inline-block"
            >
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-nasa-blue" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-nasa-blue focus:ring-2 focus:ring-nasa-blue/50 transition-all"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {apod && (
              <motion.div
                key={apod.date}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Main Image Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card overflow-hidden rounded-2xl shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative">
                    {apod.media_type === 'image' ? (
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src={apod.url}
                        alt={apod.title}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg">Video content available</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Floating Action Button */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute top-4 right-4"
                    >
                      <a
                        href={apod.hdurl || apod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Full Size</span>
                      </a>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                          {apod.title}
                        </h2>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(apod.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {apod.copyright && (
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{apod.copyright}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {apod.explanation}
                        </p>
                      </div>

                      {/* Metadata Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                        <div className="glass-card p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Media Type</h4>
                          <p className="text-white capitalize">{apod.media_type}</p>
                        </div>
                        {apod.service_version && (
                          <div className="glass-card p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">Service Version</h4>
                            <p className="text-white">{apod.service_version}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Additional Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4">About APOD</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The Astronomy Picture of the Day (APOD) is a website provided by NASA and Michigan Technological University. 
                    According to the website, "Each day a different image or photograph of our universe is featured, along with a brief explanation written by a professional astronomer."
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default APOD; 