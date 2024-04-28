// CurrentRouteDataContext.js
import React, { createContext, useContext, useState } from 'react';

const CurrentRouteDataContext = createContext();
// Custom hook to consume the context
export const useCurrentRouteData = () => useContext(CurrentRouteDataContext);

export const CurrentRouteDataProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute ] = useState(null);
  const [propagateCurrentRoute, setPropagateCallback] = useState(null);

  // You can use currentRoute here and update it using updateCurrentRoute if needed

  return (
    <CurrentRouteDataContext.Provider value={{ 
      currentRoute,
      setCurrentRoute,
      propagateCurrentRoute,
      setPropagateCallback
    }}>
      {children}
    </CurrentRouteDataContext.Provider>
  );
};