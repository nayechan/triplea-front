import 'styles/index.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RouteDataProvider } from 'contexts/RouteDataContext';
import { SelectedRegionProvider } from 'contexts/SelectedRegionContext';
import { SelectedPeriodProvider } from 'contexts/SelectedPeriodContext';
import { SelectedStrengthProvider } from 'contexts/SelectedStrengthContext';

import Home from 'pages/Main/Home';
import Region from 'pages/Region/Region';
import Period from 'pages/Period/Period';
import Strength from 'pages/Strength/Strength';
import ResultRoute from 'pages/ResultRoute/ResultRoute';
import RouteDetail from 'pages/RouteDetail/RouteDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteDataProvider>
          <SelectedRegionProvider><SelectedPeriodProvider><SelectedStrengthProvider>
            <Routes>
              <Route path="/resultRoute" element={<ResultRoute />} />
              <Route path="/routeDetail" element={<RouteDetail />} />
              <Route path="/home" element={<Home />} />
              <Route path="/region" element={<Region />} />
              <Route path="/period" element={<Period />} />
              <Route path="/strength" element={<Strength />} />
              <Route path="/" element={
                <div className="App">
                  <header className="App-header">
                    <Home />
                  </header>
                </div>
              } />
            </Routes>
          </SelectedStrengthProvider></SelectedPeriodProvider></SelectedRegionProvider>
        </RouteDataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
