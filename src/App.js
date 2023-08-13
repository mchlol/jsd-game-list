// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';


function App() {

  

  return (
    // <div className="App">
    //   <p>Check console 🧑‍💻</p>
    //   <p> {loading ? "Loading..." : 'Content loaded' } </p>
    // </div>

    <div className="App-header">
      <Router>
        <header>
          <h1>Game List</h1>
        </header>

        <nav>
          <Link to="/"><button>Home</button></Link>
        </nav>

        <Routes>

          <Route path="/" element={<SearchForm />} />

          <Route path="/search/:query" element={<SearchResults />} />

        </Routes>

        <footer>
          <small>Data graciously provided by <a href="https://rawg.io/" target="_blank">RAWG.io</a></small>
        </footer>
      </Router>
    </div>
    
  );

}

export default App;
