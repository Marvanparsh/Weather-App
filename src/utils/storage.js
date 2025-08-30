export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
};

export const cacheWeatherData = (key, data) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
    expiry: 15 * 60 * 1000 // 15 minutes
  };
  storage.set(`weather_${key}`, cacheData);
};

export const getCachedWeatherData = (key) => {
  const cached = storage.get(`weather_${key}`);
  if (cached && Date.now() - cached.timestamp < cached.expiry) {
    return cached.data;
  }
  return null;
};