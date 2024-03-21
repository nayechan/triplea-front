import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home';
import Region from './components/Category/Region';
import Period from './components/Category/Period';
import Strength from './components/Category/Strength';

function test() {
  axios({
    method: 'get',
    url: 'http://localhost:8080/test',
    responseType: 'stream'
  })
    .then(function (response) {
      document.getElementById("content").innerHTML = response.data;
    });
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/region" element={<Region/>} />
          <Route path="/period" element={<Period/>} />
          <Route path="/strength" element={<Strength/>} />
          <Route path="/" element={
            <div className="App">
              <header className="App-header">
                <Home />
              </header>
            </div>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
