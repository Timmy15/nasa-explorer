import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import APOD from './pages/APOD';
import MarsRover from './pages/MarsRover';
import EPIC from './pages/EPIC';
import NEO from './pages/NEO';
import SearchPage from './pages/Search';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App min-h-screen bg-space-black">
          <Navbar />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APOD />} />
              <Route path="/mars-rover" element={<MarsRover />} />
              <Route path="/epic" element={<EPIC />} />
              <Route path="/neo" element={<NEO />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
