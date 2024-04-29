import 'styles/index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ResultRouteDataProvider } from 'contexts/ResultRouteDataContext';
import { CurrentRouteDataProvider } from 'contexts/CurrentRouteDataContext';
import { SelectedRegionProvider } from 'contexts/SelectedRegionContext';
import { SelectedPeriodProvider } from 'contexts/SelectedPeriodContext';
import { SelectedStrengthProvider } from 'contexts/SelectedStrengthContext';

import Home from 'pages/Main/Home';
import Region from 'pages/Region/Region';
import Period from 'pages/Period/Period';
import Strength from 'pages/Strength/Strength';
import Residence from 'pages/Residence/Residence';
import BoardList from 'pages/Board/BoardList';
import BoardPost from 'pages/Board/BoardPost';
import BoardDetail from 'pages/Board/BoardDetail'
import ResultRoute from 'pages/ResultRoute/ResultRoute';
import RouteDetail from 'pages/RouteDetail/RouteDetail';
import { SelectedResidenceProvider } from 'contexts/SelectedResidenceContext';

// HOC for wrapping components with providers
const withProviders = (Component, providers) => {
  return providers.reduceRight((WrappedComponent, Provider) => {
    return <Provider>{WrappedComponent}</Provider>;
  }, Component);
};

// HOC for wrapping page components with required providers
const withRequiredProviders = (Component) => {
  return withProviders(Component, [
    ResultRouteDataProvider,
    CurrentRouteDataProvider,
    SelectedRegionProvider,
    SelectedPeriodProvider,
    SelectedStrengthProvider,
    SelectedResidenceProvider
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
          <Route path="/residence" element={withRequiredProviders(<Residence/>)} />
          <Route path="/boardList" element={withRequiredProviders(<BoardList/>)} />
          <Route path="/boardPost" element={withRequiredProviders(<BoardPost/>)} />
          <Route path="/post/:id" element={withRequiredProviders(<BoardDetail/>)} />
          <Route path="/resultRoute" element={withRequiredProviders(<ResultRoute/>)} />
          <Route path="/routeDetail" element={withRequiredProviders(<RouteDetail/>)} />
          <Route path="/" element={withRequiredProviders(<Home/>)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
