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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/region"
            element={withProviders(<Region />, [
              SelectedRegionProvider,
            ])}
          />
          <Route
            path="/period"
            element={withProviders(<Period />, [
              SelectedPeriodProvider,
            ])}
          />
          <Route
            path="/strength"
            element={withProviders(<Strength />, [
              SelectedStrengthProvider,
            ])}
          />
          <Route
            path="/resultRoute"
            element={withProviders(<ResultRoute />, [
              RouteDataProvider,
              SelectedRegionProvider,
              SelectedPeriodProvider,
              SelectedStrengthProvider,
            ])}
          />
          <Route
            path="/routeDetail"
            element={withProviders(<RouteDetail />, [
              RouteDataProvider,
              SelectedRegionProvider,
              SelectedPeriodProvider,
              SelectedStrengthProvider,
            ])}
          />
          <Route
            path="/"
            element={
              <div className="App">
                <header className="App-header">
                  <Home />
                </header>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
