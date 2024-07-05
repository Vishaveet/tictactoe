import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Playgame from './components/Playgame';
import Player2 from './components/Player2';

function App() {

  return (
    <div className="App">
      <Router>
        
          <Routes>

          <Route exact path="/" element={ <Home/> } />  

            <Route exact path="/startgame" element={ <Playgame/> } />

            <Route exact path="/player2" element={ <Player2/> } />
              
          </Routes>
        </Router>
    </div>
  );
}

export default App;