import './App.css';
import { Route, Routes, HashRouter as Router } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import SearchForm from './components/SearchForm';
import ViewGame from './components/ViewGame';
import MyLists from './components/MyLists';
import NavBar from './components/NavBar';
import AppFooter from './components/AppFooter';

function App() {

  return (
    <>
    <div className="App-header">
      <Router>

        <NavBar />


        <Routes>
          <Route path="/" element={<SearchForm />} />

          <Route path="/search/popular" element={<SearchResults />} />

          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/search/:query/page/:1" element={<SearchResults />} />

          <Route path="/game/:slug" element={<ViewGame />} />

          <Route path="/my-lists" element={<MyLists />} />
        </Routes>

        

      </Router>
    </div>

    <AppFooter />

    </>
    
  );

}

export default App;
