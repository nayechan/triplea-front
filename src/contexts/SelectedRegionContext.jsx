import React, { createContext, useContext, useState } from 'react';

const SelectedRegionContext = createContext();

export const SelectedRegionProvider = ({ children }) => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    return (
        <SelectedRegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
            {children}
        </SelectedRegionContext.Provider>
    );
};

export const useSelectedRegionContext = () => useContext(SelectedRegionContext);
