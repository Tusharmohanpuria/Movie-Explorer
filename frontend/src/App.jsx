import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="main-window" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "90vw", width: "100%", minHeight: "100vh"}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;



