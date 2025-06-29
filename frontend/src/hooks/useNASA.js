import { useQuery } from 'react-query';
import { nasaAPI } from '../utils/api';

// Custom hook for APOD data
export const useAPOD = (params = {}) => {
  return useQuery(
    ['apod', params],
    () => nasaAPI.getAPOD(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};

// Custom hook for Mars Rover data
export const useMarsRover = (params = {}) => {
  return useQuery(
    ['mars-rover', params],
    () => nasaAPI.getMarsRover(params),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};

// Custom hook for available Mars rovers
export const useMarsRovers = () => {
  return useQuery(
    ['mars-rovers'],
    () => nasaAPI.getMarsRovers(),
    {
      staleTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
    }
  );
};

// Custom hook for EPIC data
export const useEPIC = (params = {}) => {
  return useQuery(
    ['epic', params],
    () => nasaAPI.getEPIC(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};

// Custom hook for NEO data
export const useNEO = (params = {}) => {
  return useQuery(
    ['neo', params],
    () => nasaAPI.getNEO(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};

// Custom hook for NASA search
export const useNASASearch = (params = {}) => {
  return useQuery(
    ['nasa-search', params],
    () => nasaAPI.searchNASA(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      enabled: !!params.q, // Only run query if search term exists
    }
  );
};

// Custom hook for backend health check
export const useHealthCheck = () => {
  return useQuery(
    ['health'],
    () => nasaAPI.healthCheck(),
    {
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 30 * 1000, // Check every 30 seconds
    }
  );
}; 