import React from 'react';
import { UilWifiSlash } from '@iconscout/react-unicons';

const OfflineIndicator = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
      <UilWifiSlash size={16} />
      <span className="text-sm font-medium">You're offline - showing cached data</span>
    </div>
  );
};

export default OfflineIndicator;