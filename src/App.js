import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [games, setGames] = useState();
  const [loading, setLoading] = useState(false);

  // useEffect( () => {
  //   async function fetchGames() {
  //     const dataSource = `/.netlify/functions/gamelist`;
  //     try {
  //       setLoading(true);

  //       const gameList = await fetch(dataSource)
  //         .then( (res) => res.json());
  //         setGames(gameList);
  //         console.log('games',games);
  //         console.log('Type of games',typeof games)
  //         console.log(games.response);

  //     } catch (err) {
  //       console.log('error:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchGames();
  // }, []);


  useEffect( () => {
    async function fetchGames() {
      axios.get(`https://rawg.io/api/games?token&key=${process.env.REACT_APP_API_KEY}`)
      .then ( res => {
        console.log('Response:',res.data.results);
        setGames(res.data.results);
      })
      .then ( setLoading(false))
      .catch ( err => {
        console.log('Error:',err);
      })
    }
    fetchGames();
  }, []);



  return (
    <div className="App">
      <p>Check console 🧑‍💻</p>
      <p> {loading ? "Loading..." : games.map (game => game.name) } </p>
    </div>
  );
}

export default App;
