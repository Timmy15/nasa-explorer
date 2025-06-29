import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, Filter, Rocket, MapPin, Clock } from 'lucide-react';
import { useMarsRover, useMarsRovers } from '../hooks/useNASA';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MarsRover = () => {
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const { data: roversData } = useMarsRovers();
  const { data, isLoading, error, refetch } = useMarsRover({
    rover: selectedRover,
    earth_date: selectedDate || undefined,
    camera: selectedCamera || undefined
  });

  const photos = data?.data?.photos || [];
  const rovers = roversData?.data?.rovers || [];

  const cameras = {
    curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
    opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
    spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
    perseverance: ['EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM1', 'EDL_PUCAM2', 'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_RIGHT', 'MCZ_LEFT', 'FRONT_HAZCAM_LEFT_A', 'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT', 'SKYCAM', 'SHERLOC_WATSON', 'SUPERCAM_RMI', 'LCAM']
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading Mars Rover photos..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
        title="Failed to load Mars Rover data"
        message="Unable to fetch Mars Rover photos."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-red-900/20 to-orange-900/20">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
                Mars Rover Photos
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore the surface of Mars through the eyes of NASA's rovers. Discover the Red Planet like never before.
            </p>
          </div>

          {/* Enhanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl mb-8 shadow-xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Filter className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-white">Filter Options</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rover Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Rover</label>
                <select
                  value={selectedRover}
                  onChange={(e) => setSelectedRover(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/50 transition-all"
                >
                  {rovers.map(rover => (
                    <option key={rover.name} value={rover.name.toLowerCase()}>
                      {rover.name} ({rover.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Camera Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Camera</label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/50 transition-all"
                >
                  <option value="">All Cameras</option>
                  {cameras[selectedRover]?.map(camera => (
                    <option key={camera} value={camera}>{camera}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/50 transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {photos.length} Photos Found
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4" />
                    <span>{selectedRover.toUpperCase()}</span>
                  </div>
                  {selectedCamera && (
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>{selectedCamera}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photo Grid */}
          <AnimatePresence mode="wait">
            {photos.length > 0 ? (
              <motion.div
                key={`${selectedRover}-${selectedCamera}-${selectedDate}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
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
                          src={photo.img_src}
                          alt={`Mars photo ${photo.id}`}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                          {photo.camera.full_name}
                        </h3>
                        
                        <div className="space-y-2 text-sm text-gray-300">
                          <div className="flex items-center space-x-2">
                            <Rocket className="w-4 h-4 text-red-400" />
                            <span><strong>Rover:</strong> {photo.rover.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span><strong>Date:</strong> {new Date(photo.earth_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-yellow-400" />
                            <span><strong>Sol:</strong> {photo.sol}</span>
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
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">No Photos Found</h3>
                  <p className="text-gray-300 mb-6">
                    No photos found for the selected criteria. Try adjusting your filters or selecting a different date.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDate('');
                      setSelectedCamera('');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MarsRover; 