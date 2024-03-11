import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function test(){
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 id="content">test 2</h1>
        <button onClick={test}>test</button>
      </header>
    </div>
  );
}

export default App;
