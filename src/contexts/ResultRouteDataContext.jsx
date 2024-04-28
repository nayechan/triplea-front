import React, { createContext, useState, useContext } from 'react';

// Create a context for route data
const ResultRouteDataContext = createContext();

// Custom hook to consume the context
export const useResultRouteData = () => useContext(ResultRouteDataContext);

// Provider component to manage route data state
export const ResultRouteDataProvider = ({ children }) => {
  const [resultRouteData, setResultRouteData] = useState([]);
  const [selectedRouteIndex, selectRouteIndex] = useState(-1);

  const updateCurrentRoute = (updatedData) => {
    setResultRouteData((prevRouteData)=>{
      const updatedRouteData = [...prevRouteData];
      updatedRouteData[selectedRouteIndex] = updatedData;
      return updatedRouteData;
    });
  };

  return (
    <ResultRouteDataContext.Provider 
      value={{ 
        resultRouteData,
        setResultRouteData,
        selectedRouteIndex,
        updateCurrentRoute,
        selectRouteIndex
      }}
    >
      {children}
    </ResultRouteDataContext.Provider>
  );
};
