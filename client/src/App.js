import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import MainComponent from './components/MainComponent';
import InviteeComponent from './components/InviteeComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MainComponent />} />
          <Route path="/availability/:link" element={<InviteeComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
