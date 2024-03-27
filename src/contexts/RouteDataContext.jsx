import React, { createContext, useState, useContext } from 'react';

// Create a context for route data
const RouteDataContext = createContext();

// Custom hook to consume the context
export const useRouteData = () => useContext(RouteDataContext);

// Provider component to manage route data state
export const RouteDataProvider = ({ children }) => {
  const [routeData, setRouteData] = useState(null);

  // Function to update route data
  const updateRouteData = (data) => {
    setRouteData(data);
    console.log(data);
  };

  return (
    <RouteDataContext.Provider value={{ routeData, setRouteData, updateRouteData }}>
      {children}
    </RouteDataContext.Provider>
  );
};
