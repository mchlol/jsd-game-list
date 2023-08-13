import { useEffect, useState } from 'react';
import './App.css';
// import axios from 'axios';


function App() {

  const [games, setGames] = useState();
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    async function fetchGames() {
      const dataSource = `https://rawg.io/api/games?token&key=${process.env.REACT_APP_API_KEY}`;
      try {
        setLoading(true);

        const gameList = await fetch(dataSource)
          .then( (res) => res.json());
          setGames(gameList);
          console.log('games',games);
          console.log('Type of games',typeof games)
          console.log(games.response);
          console.log('gameList:',gameList);

      } catch (err) {
        console.log('error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div className="App">
      <p>Check console 🧑‍💻</p>
      <p> {loading ? "Loading..." : 'Content loaded' } </p>
    </div>
  );
}

export default App;
