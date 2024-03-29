import React, { createContext, useContext, useState } from 'react';

// 여러 데이터를 관리할 컨텍스트 생성
const SelectedRegionContext = createContext();

// AppProvider 컴포넌트 정의
export const SelectedRegionProvider = ({ children }) => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    return (
        <SelectedRegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
            {children}
        </SelectedRegionContext.Provider>
    );
};

// 커스텀 훅을 정의하여 컨텍스트 사용
export const useSelectedRegionContext = () => useContext(SelectedRegionContext);
