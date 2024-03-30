import React, { createContext, useState, useContext } from 'react';

// Create a context for route data
const RouteDataContext = createContext();

// Custom hook to consume the context
export const useRouteData = () => useContext(RouteDataContext);

// Provider component to manage route data state
export const RouteDataProvider = ({ children }) => {
  const [routeData, setRouteData] = useState([]);
  const [selectedRouteKey, selectRouteKey] = useState(-1);

  return (
    <RouteDataContext.Provider value={{ selectedRouteKey, selectRouteKey, routeData, setRouteData }}>
      {children}
    </RouteDataContext.Provider>
  );
};
