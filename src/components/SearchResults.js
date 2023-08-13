import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Card, Button } from "react-daisyui";


// const API_KEY = process.env.REACT_APP_API_KEY;

function SearchResults() {

//     const [games, setGames] = useState();
//   const [loading, setLoading] = useState(false);

//   useEffect( () => {
//     async function fetchGames() {
//       const dataSource = `https://rawg.io/api/games?token&key=${process.env.REACT_APP_API_KEY}`;
//       try {
//         setLoading(true);

//         const gameList = await fetch(dataSource)
//           .then( (res) => res.json());
//           setGames(gameList);
//           console.log('games',games);
//           console.log('Type of games',typeof games)
//           console.log(games.response);
//           console.log('gameList:',gameList);

//       } catch (err) {
//         console.log('error:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchGames();
//   }, []);

    const params = useParams();

    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        console.log('useEffect callback running');
        loadSearchResults(params.query);
    }, [params.query]);
    
    function loadSearchResults (query) {
        setLoading(true);

        axios.get(`https://rawg.io/api/games?search=${query}&token&key=${process.env.REACT_APP_API_KEY}`)
        .then (res => {
            console.log('Response:',res);
            setGames(res.data.results);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error:',err);
            setError(err);
            setLoading(false);
        })
    } // loadSearchResults

    if (error) {
        return <p>Could not load search results.</p>
    }

    return (
        <div className="searchResults">
            {
                loading
                ?
                <Loading />
                :
                
                games.map( game =>
                <Card 
                className="max-w-md game-card"
                onClick={ () => navigate(`${game.slug}`)} 
                key={game.slug} 
                >
                    <Card.Image className="gameImg" src={game.background_image} alt={game.name} />
                    
                    <Card.Body>
                        <Card.Title tag="h2">{game.name}
                    </Card.Title>
                        <p>Released {game.released}</p>
                        <Card.Actions className="justify-end">
                            <Button className="btn btn-primary">View</Button>
                        </Card.Actions>
                    </Card.Body>
                </Card> 
                )
            }
        </div>
    )
}

export default SearchResults;