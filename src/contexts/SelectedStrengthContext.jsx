import React, { createContext, useContext, useState } from 'react';

const SelectedStrengthContext = createContext();

export const SelectedStrengthProvider = ({ children }) => {
    const [selectedStrength, setSelectedStrength] = useState(null);

    return (
        <SelectedStrengthContext.Provider value={{ selectedStrength, setSelectedStrength }}>
            {children}
        </SelectedStrengthContext.Provider>
    );
};

export const useSelectedStrengthContext = () => useContext(SelectedStrengthContext);
