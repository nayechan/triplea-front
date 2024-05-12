import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ResultRouteDataProvider } from 'contexts/ResultRouteDataContext';
import { CurrentRouteDataProvider } from 'contexts/CurrentRouteDataContext';

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
          <Route path="/home" element={<Home/>}/>
          <Route path="/region" element={<Region/>} />
          <Route path="/period" element={<Period/>} />
          <Route path="/strength" element={<Strength/>} />
          <Route path="/residence" element={<Residence/>} />
          <Route path="/boardList" element={<BoardList/>} />
          <Route path="/boardPost" element={<BoardPost/>} />
          <Route path="/post/:id" element={<BoardDetail/>} />
          <Route path="/resultRoute" element={
            withProviders(<ResultRoute/>, [ResultRouteDataProvider, CurrentRouteDataProvider])
          }/>
          <Route path="/routeDetail" element={
            withProviders(<RouteDetail/>, [ResultRouteDataProvider, CurrentRouteDataProvider])
          }/>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
