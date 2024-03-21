import 'styles/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from 'components/NavBar';
import Main from 'pages/Main/Main';
import GradientBackground from 'components/GradientBackground'; // Import the GradientBackground component


/*
import axios from 'axios';

function test(){
  axios({
    method: 'get',
    url: 'http://localhost:8080/get/test1',
    responseType: 'stream'
  })
  .then(function (response) {
    document.getElementById("content").innerHTML = response.data;
  });
}
*/

function App() {
  return (
    <div className="App">
      <NavBar/>
      <GradientBackground/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<Main />} />
          <Route path="/contact" element={<Main />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
