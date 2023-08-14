// import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';
import ViewGame from './components/ViewGame';
import { Button, Navbar, Footer } from 'react-daisyui';

function App() {

  

  return (

    <div className="App-header">
      <Router>

          <Navbar>
            <div className="flex-1">
              <Link to="/">
                <Button tag="a" className="text-xl normal-case" color="ghost">
                  GameList
                </Button>
              </Link>
            </div>

            <div className="flex-1">
              <Link to="/my-lists">
                <Button tag="a" shape="square" color="ghost">
                  My Lists
                </Button>
              </Link>
            </div>

          </Navbar>


        <Routes>
          <Route path="/" element={<SearchForm />} />

          {/* <Route path="/my-lists" element={<MyLists /> } /> */}

          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/:slug" element={<ViewGame />} />
        </Routes>

        <Footer className="p-4 bg-primary text-secondary-content">
          <div>
            <p>
              Data provided by <a className="link link-hover" href="https://rawg.io/" target="_blank">RAWG.io</a>
            </p>
          </div>
        </Footer>

      </Router>
    </div>
    
  );

}

export default App;
