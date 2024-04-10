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

// HOC for wrapping components with providers
const withProviders = (Component, providers) => {
  return providers.reduceRight((WrappedComponent, Provider) => {
    return <Provider>{WrappedComponent}</Provider>;
  }, Component);
};

// HOC for wrapping page components with required providers
const withRequiredProviders = (Component) => {
  return withProviders(Component, [
    RouteDataProvider,
    SelectedRegionProvider,
    SelectedPeriodProvider,
    SelectedStrengthProvider,
  ]);
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={withRequiredProviders(<Home/>)} />
          <Route path="/region" element={withRequiredProviders(<Region/>)} />
          <Route path="/period" element={withRequiredProviders(<Period/>)} />
          <Route path="/strength" element={withRequiredProviders(<Strength/>)} />
          <Route path="/resultRoute" element={withRequiredProviders(<ResultRoute/>)} />
          <Route path="/routeDetail" element={withRequiredProviders(<RouteDetail/>)} />
          <Route path="/" element={withRequiredProviders(<Home/>)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
