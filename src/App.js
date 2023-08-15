// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';
import ViewGame from './components/ViewGame';
import MyLists from './components/MyLists';
import NavBar from './components/NavBar';
import { Footer } from 'react-daisyui';

function App() {

  

  return (

    <div className="App-header">
      <Router>

        <NavBar />


        <Routes>
          <Route path="/" element={<SearchForm />} />

          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/game/:slug" element={<ViewGame />} />

          <Route path="/my-lists" element={<MyLists />} />
        </Routes>

        <Footer className="p-4 bg-primary text-secondary-content">
          <div>
            <p>
              All data provided by <Link to="https://rawg.io/" rel="noreferrer" target="_blank">RAWG.io</Link>
            </p>
          </div>
        </Footer>

      </Router>
    </div>
    
  );

}

export default App;
