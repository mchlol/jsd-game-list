import { useEffect, useState } from 'react';
import './App.css';
function App() {

  const [games, setGames] = useState();
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    async function fetchGames() {
      const dataSource = `/.netlify/functions/gamelist`;
      try {
        setLoading(true);

        const gameList = await fetch(dataSource)
          .then( (res) => res.json());
          setGames(gameList);
          console.log('games',games);
          console.log('Type of games',typeof games)
          console.log(games.response);

      } catch (err) {
        console.log('error:',err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);


  return (
    <div className="App">
      <p>Check console 🧑‍💻</p>
      <p> {loading ? "Loading..." : games.response.map(game => <p>{game.name}</p>) } </p>
    </div>
  );
}

export default App;
