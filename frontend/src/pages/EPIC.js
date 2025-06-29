import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, ExternalLink, MapPin, Clock, Eye } from 'lucide-react';
import { useEPIC } from '../hooks/useNASA';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EPIC = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const { data, isLoading, error, refetch } = useEPIC({
    date: selectedDate || undefined
  });

  const epicData = data?.data || data || [];

  if (isLoading) {
    return <LoadingSpinner text="Loading Earth images..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
        title="Failed to load EPIC data"
        message="Unable to fetch Earth images from EPIC."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-blue-900/20 to-cyan-900/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6"
            >
              <Globe className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Earth from Space
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              View our beautiful planet from one million miles away through NASA's EPIC camera. See Earth as never before.
            </p>
            
            {/* Enhanced Date Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 inline-block"
            >
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </motion.div>
          </div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {epicData.length} Earth Images Found
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Eye className="w-4 h-4" />
                  <span>EPIC Camera</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Grid */}
          <AnimatePresence mode="wait">
            {epicData.length > 0 ? (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {epicData.map((image, index) => {
                  const imageDate = new Date(image.date);
                  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${imageDate.getFullYear()}/${String(imageDate.getMonth() + 1).padStart(2, '0')}/${String(imageDate.getDate()).padStart(2, '0')}/png/${image.image}.png`;
                  
                  return (
                    <motion.div
                      key={image.identifier}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative"
                    >
                      <div className="glass-card overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        {/* Image */}
                        <div className="relative overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            src={imageUrl}
                            alt={`Earth from EPIC ${image.identifier}`}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center hidden"
                            style={{ display: 'none' }}
                          >
                            <div className="text-center">
                              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-400 text-sm">Image unavailable</p>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                            Earth from EPIC
                          </h3>
                          
                          <div className="space-y-2 text-sm text-gray-300 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-400" />
                              <span><strong>Date:</strong> {imageDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span><strong>Time:</strong> {imageDate.toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span><strong>Location:</strong> {image.centroid_coordinates.lat.toFixed(2)}°N, {image.centroid_coordinates.lon.toFixed(2)}°E</span>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Full Size</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                  <Globe className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">No Earth Images Found</h3>
                  <p className="text-gray-300 mb-6">
                    No Earth images found for the selected date. Try a different date to see our beautiful planet from space.
                  </p>
                  <button
                    onClick={() => setSelectedDate('')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                  >
                    Clear Date
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">About EPIC</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Earth Polychromatic Imaging Camera (EPIC) is a 10-channel spectroradiometer (317 – 780 nm) aboard DSCOVR that provides 10 narrow band spectral images of the entire sunlit face of Earth from sunrise to sunset.
              </p>
              <p className="text-gray-300 leading-relaxed">
                EPIC captures images from 1 million miles away, providing a unique perspective of our planet and helping scientists study Earth's climate, weather patterns, and atmospheric composition.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EPIC; 