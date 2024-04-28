import React, { createContext, useContext, useState } from 'react';

const SelectedResidenceContext = createContext();

export const SelectedResidenceProvider = ({ children }) => {
    const [selectedResidence, setSelectedResidence] = useState(null);

    return (
        <SelectedResidenceContext.Provider value={{ selectedResidence, setSelectedResidence }}>
            {children}
        </SelectedResidenceContext.Provider>
    );
};

export const useSelectedResidenceContext = () => useContext(SelectedResidenceContext);
