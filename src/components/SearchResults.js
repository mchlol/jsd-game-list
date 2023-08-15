import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Card, Button } from "react-daisyui";
import { formatDate } from "../functions";


function SearchResults() {

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
        <>
        <div>
            {
                loading
                ?
                <Loading />
                :
                <div id="searchResults">

                    { games.map( game =>
                    <Card 
                    className="p-4 max-w-md game-card"
                    onClick={ () => navigate(`/game/${game.slug}`)} 
                    key={game.slug} 
                    >
                        <Card.Image className="gameImg" src={game.background_image} alt={game.name} />
                        
                        <Card.Body>
                            <Card.Title tag="h2">{game.name}
                        </Card.Title>
                            <span className="spanFormat">Released {formatDate(game.released)}</span>
                            <Card.Actions className="justify-end">
                                <Button className="btn btn-sm btn-primary">View</Button>
                            </Card.Actions>
                        </Card.Body>
                    </Card> 
                    ) } 

                    <Button>Next Page →</Button>
                </div>
                
            }
            
        </div>
        
        </>
    )
}

export default SearchResults;