import 'styles/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from 'axios';

import Header from 'components/Header';

import Home from 'pages/Main/Home';
import Region from 'pages/Region/Region';
import Period from 'pages/Period/Period';
import Strength from 'pages/Strength/Strength';
import ResultRoute from 'pages/ResultRoute/ResultRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/region" element={<Region/>} />
          <Route path="/period" element={<Period/>} />
          <Route path="/strength" element={<Strength/>} />
          <Route path="/resultRoute" element={<ResultRoute/>}/>
          <Route path="/" element={
            <div className="App">
              <header className="App-header">
                <Home />
              </header>
            </div>
          } />

        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
