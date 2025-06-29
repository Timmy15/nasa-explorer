import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Calendar, AlertTriangle, TrendingUp, MapPin, Ruler, Gauge } from 'lucide-react';
import { useNEO } from '../hooks/useNASA';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const NEO = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const { data, isLoading, error, refetch } = useNEO({
    start_date: selectedDate || undefined,
    end_date: selectedDate || undefined
  });

  const neoData = data?.data?.near_earth_objects || {};

  if (isLoading) {
    return <LoadingSpinner text="Loading Near Earth Objects..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
        title="Failed to load NEO data"
        message="Unable to fetch Near Earth Objects data."
      />
    );
  }

  const allNeos = Object.values(neoData).flat();

  const getHazardLevel = (isHazardous) => {
    return isHazardous ? 'High' : 'Low';
  };

  const getHazardColor = (isHazardous) => {
    return isHazardous ? 'text-red-400' : 'text-green-400';
  };

  const getHazardBgColor = (isHazardous) => {
    return isHazardous ? 'bg-red-500/20' : 'bg-green-500/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-yellow-900/20 to-orange-900/20">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-6"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 bg-clip-text text-transparent">
                Near Earth Objects
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Track asteroids and comets that come close to Earth. Monitor potential impact risks and learn about these fascinating celestial objects.
            </p>
            
            {/* Enhanced Date Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 inline-block"
            >
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </motion.div>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{allNeos.length}</div>
                  <div className="text-gray-300 text-sm">Total Objects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    {allNeos.filter(neo => neo.is_potentially_hazardous_asteroid).length}
                  </div>
                  <div className="text-gray-300 text-sm">Potentially Hazardous</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {allNeos.filter(neo => !neo.is_potentially_hazardous_asteroid).length}
                  </div>
                  <div className="text-gray-300 text-sm">Safe Objects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {Object.keys(neoData).length}
                  </div>
                  <div className="text-gray-300 text-sm">Days Tracked</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* NEO Grid */}
          <AnimatePresence mode="wait">
            {allNeos.length > 0 ? (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {allNeos.map((neo, index) => (
                  <motion.div
                    key={neo.id}
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
                    <div className={`glass-card overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${getHazardBgColor(neo.is_potentially_hazardous_asteroid)}`}>
                      {/* Header */}
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                            {neo.name}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getHazardColor(neo.is_potentially_hazardous_asteroid)} ${getHazardBgColor(neo.is_potentially_hazardous_asteroid)}`}>
                            {getHazardLevel(neo.is_potentially_hazardous_asteroid)} Risk
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span>ID: {neo.id}</span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Ruler className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-300">Diameter:</span>
                            </div>
                            <div className="text-white font-semibold">
                              {neo.estimated_diameter?.kilometers?.estimated_diameter_min?.toFixed(2)} - {neo.estimated_diameter?.kilometers?.estimated_diameter_max?.toFixed(2)} km
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Gauge className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">Velocity:</span>
                            </div>
                            <div className="text-white font-semibold">
                              {parseFloat(neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour).toFixed(0)} km/h
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-red-400" />
                            <span className="text-gray-300">Closest Approach:</span>
                          </div>
                          <div className="text-white font-semibold">
                            {parseFloat(neo.close_approach_data[0]?.miss_distance?.kilometers).toLocaleString()} km
                          </div>
                          <div className="text-gray-400 text-sm">
                            {new Date(neo.close_approach_data[0]?.close_approach_date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">Orbiting Body:</span>
                          </div>
                          <div className="text-white font-semibold">
                            {neo.close_approach_data[0]?.orbiting_body}
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="p-6 bg-white/5 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-300">
                            <span className="font-semibold">Magnitude:</span> {neo.absolute_magnitude_h}
                          </div>
                          <div className="text-sm text-gray-300">
                            <span className="font-semibold">NEO Score:</span> {neo.nasa_jpl_url ? 'Available' : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                  <Zap className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">No NEOs Found</h3>
                  <p className="text-gray-300 mb-6">
                    No Near Earth Objects found for the selected date. Try a different date to see asteroids and comets near Earth.
                  </p>
                  <button
                    onClick={() => setSelectedDate('')}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
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
              <h3 className="text-2xl font-bold text-white mb-4">About Near Earth Objects</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Near Earth Objects (NEOs) are asteroids and comets that orbit the Sun and come within 1.3 astronomical units (AU) of Earth. 
                NASA's Center for Near Earth Object Studies (CNEOS) tracks these objects to assess potential impact risks.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Potentially Hazardous Asteroids (PHAs) are NEOs larger than 140 meters that come within 0.05 AU of Earth. 
                While no known PHA poses an immediate threat, continuous monitoring helps ensure early detection of any potential risks.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NEO; 