import React, { createContext, useContext, useState } from 'react';

const SelectedPeriodContext = createContext();

export const SelectedPeriodProvider = ({ children }) => {
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    return (
        <SelectedPeriodContext.Provider value={{ selectedPeriod, setSelectedPeriod }}>
            {children}
        </SelectedPeriodContext.Provider>
    );
};

export const useSelectedPeriodContext = () => useContext(SelectedPeriodContext);
