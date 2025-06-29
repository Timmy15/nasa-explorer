import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Image, Video, FileText, ExternalLink, Calendar, User, Filter } from 'lucide-react';
import { useNASASearch } from '../hooks/useNASA';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  const { data, isLoading, error, refetch } = useNASASearch({
    q: query || undefined,
    media_type: mediaType || undefined,
    year_start: yearStart || undefined,
    year_end: yearEnd || undefined
  });

  const searchResults = data?.data?.collection?.items || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      refetch();
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Searching NASA's media library..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
        title="Failed to search NASA library"
        message="Unable to search NASA's media collection."
      />
    );
  }

  const getMediaIcon = (mediaType) => {
    switch (mediaType) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getMediaColor = (mediaType) => {
    switch (mediaType) {
      case 'image':
        return 'text-blue-400';
      case 'video':
        return 'text-red-400';
      case 'audio':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-green-900/20 to-teal-900/20">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mb-6"
            >
              <SearchIcon className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-space font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-teal-400 to-green-600 bg-clip-text text-transparent">
                NASA Media Library
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Search through NASA's vast collection of images, videos, and audio files. Discover the wonders of space exploration.
            </p>
          </div>

          {/* Enhanced Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl mb-8 shadow-xl"
          >
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <SearchIcon className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Search Options</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Search Query */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Search Query</label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter search terms (e.g., 'mars rover', 'galaxy', 'nebula')"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                    />
                  </div>
                </div>

                {/* Media Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Media Type</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all"
                  >
                    <option value="">All Types</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Year Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={yearStart}
                      onChange={(e) => setYearStart(e.target.value)}
                      placeholder="Start"
                      min="1900"
                      max="2024"
                      className="px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all text-sm"
                    />
                    <input
                      type="number"
                      value={yearEnd}
                      onChange={(e) => setYearEnd(e.target.value)}
                      placeholder="End"
                      min="1900"
                      max="2024"
                      className="px-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!query.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center space-x-2"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span>Search NASA Library</span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Results Summary */}
          {query && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {searchResults.length} Results Found
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Filter className="w-4 h-4" />
                    <span>"{query}"</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          <AnimatePresence mode="wait">
            {searchResults.length > 0 ? (
              <motion.div
                key={`${query}-${mediaType}-${yearStart}-${yearEnd}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {searchResults.map((item, index) => {
                  const data = item.data[0];
                  const links = item.links || [];
                  const imageLink = links.find(link => link.render === 'image') || links[0];
                  
                  return (
                    <motion.div
                      key={item.href}
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
                          {imageLink ? (
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              src={imageLink.href}
                              alt={data.title || 'NASA media'}
                              className="w-full h-48 object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                              <div className="text-center">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">No preview</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Media Type Badge */}
                          <div className="absolute top-4 left-4">
                            <div className={`flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs ${getMediaColor(data.media_type)}`}>
                              {getMediaIcon(data.media_type)}
                              <span className="capitalize">{data.media_type}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                            {data.title}
                          </h3>
                          
                          <div className="space-y-2 text-sm text-gray-300 mb-4">
                            {data.date_created && (
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-green-400" />
                                <span>{new Date(data.date_created).toLocaleDateString()}</span>
                              </div>
                            )}
                            {data.photographer && (
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-blue-400" />
                                <span>{data.photographer}</span>
                              </div>
                            )}
                            {data.location && (
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-purple-400" />
                                <span className="truncate">{data.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Description */}
                          {data.description && (
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                              {data.description}
                            </p>
                          )}
                          
                          {/* Action Button */}
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Details</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : query ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                  <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">No Results Found</h3>
                  <p className="text-gray-300 mb-6">
                    No media found for "{query}". Try different search terms or adjust your filters.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setMediaType('');
                      setYearStart('');
                      setYearEnd('');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">About NASA's Media Library</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                NASA's media library contains millions of images, videos, and audio files from space missions, 
                astronomical observations, and Earth science research. This vast collection documents humanity's 
                exploration of space and our understanding of the universe.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Search through historical photographs, stunning space imagery, mission videos, and scientific 
                visualizations. All media is freely available for educational and personal use.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage; 