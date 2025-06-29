import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Camera, Globe, Zap, Search, Star, ArrowRight, Play } from 'lucide-react';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const features = [
    {
      id: 'apod',
      title: 'Astronomy Picture of the Day',
      description: 'Discover stunning daily images from across the cosmos',
      icon: Camera,
      color: 'from-purple-500 to-pink-500',
      path: '/apod',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'mars',
      title: 'Mars Rover Photos',
      description: 'Explore the Red Planet through rover cameras',
      icon: Rocket,
      color: 'from-red-500 to-orange-500',
      path: '/mars-rover',
      gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20'
    },
    {
      id: 'epic',
      title: 'Earth from Space',
      description: 'View our beautiful planet from 1 million miles away',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      path: '/epic',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'neo',
      title: 'Near Earth Objects',
      description: 'Track asteroids and comets near Earth',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      path: '/neo',
      gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'search',
      title: 'NASA Image Library',
      description: 'Search through NASA\'s vast media collection',
      icon: Search,
      color: 'from-green-500 to-teal-500',
      path: '/search',
      gradient: 'bg-gradient-to-br from-green-500/20 to-teal-500/20'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-nasa-blue/20 to-cosmic-purple/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 nasa-gradient rounded-full flex items-center justify-center"
          >
            <Rocket className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-space font-bold mb-6">
            <span className="bg-gradient-to-r from-stellar-yellow via-nasa-red to-cosmic-purple bg-clip-text text-transparent">
              NASA Explorer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on an extraordinary journey through space and time. Explore the wonders of our universe with real data from NASA's cutting-edge missions.
          </p>
          
          <motion.button
            onClick={scrollToFeatures}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-nasa-blue to-nasa-red text-white rounded-full text-lg font-bold shadow-2xl hover:shadow-nasa-blue/25 transition-all duration-300 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div id="features-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredCard(feature.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <Link to={feature.path}>
                  <div className={`relative overflow-hidden rounded-2xl p-8 h-full ${feature.gradient} border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-300`}>
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Icon */}
                    <motion.div
                      animate={hoveredCard === feature.id ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative z-10`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-stellar-yellow transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Arrow */}
                      <motion.div
                        animate={hoveredCard === feature.id ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center space-x-2 text-nasa-blue group-hover:text-stellar-yellow transition-colors duration-300"
                      >
                        <span className="font-semibold">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                    
                    {/* Floating Stars */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-stellar-yellow rounded-full"
                          style={{
                            top: `${i * 8}px`,
                            right: `${i * 4}px`,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">Real NASA Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-bold text-nasa-blue mb-2"
                >
                  5
                </motion.div>
                <div className="text-gray-300">NASA APIs</div>
              </div>
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-4xl font-bold text-stellar-yellow mb-2"
                >
                  ∞
                </motion.div>
                <div className="text-gray-300">Space Images</div>
              </div>
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-4xl font-bold text-cosmic-purple mb-2"
                >
                  24/7
                </motion.div>
                <div className="text-gray-300">Live Updates</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 