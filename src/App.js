// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';
import { Button, Navbar, Footer } from 'react-daisyui';

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

        

          <Navbar>
            <div className="flex-1">
              <Link to="/">
              <Button className="text-xl" color="primary"> Home </Button>
              </Link>
            </div>

            
          </Navbar>

          <Routes>

          <Route path="/" element={<SearchForm />} />

          <Route path="/search/:query" element={<SearchResults />} />

        </Routes>

        <Footer>
          <small>Data graciously provided by <a href="https://rawg.io/" target="_blank">RAWG.io</a></small>
        </Footer>
      </Router>
    </div>
    
  );

}

export default App;
