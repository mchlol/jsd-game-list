import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Card, Button, Badge } from "react-daisyui";
import GameScreenshots from "./GameScreenshots";
import BackButton from "./BackButton";
import { addToList, formatDate } from "../functions";

function ViewGame () {

    const params = useParams();
    const navigate = useNavigate();

    const [game,setGame] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const [items, setItems] = useState([]);

    useEffect( () => {
        // get the wishlist object from local storage
        // copy it into a variable
        // push another object into the array
        const getWishlist = JSON.parse(localStorage.getItem('wishlist'));
        console.log(getWishlist);

        localStorage.setItem('testItem',JSON.stringify(items));

    }, [items]);

    useEffect( () => {
        loadGameDetails(params.slug);
    }, [params.slug]);

    function loadGameDetails(slug) {
        setLoading(true);

        const callApi = `https://rawg.io/api/games/${slug}&token&key=${process.env.REACT_APP_API_KEY}`;
        // same call as for games but for a specific game it returns a CORS error

        const url = 'https://corsproxy.io/?' + encodeURIComponent(callApi);
        // CORS ok but now it returns a bad request error

        // this works just fine...but exposes the API key 😤
        axios.get(`https://corsproxy.io/?https%3A%2F%2Frawg.io%2Fapi%2Fgames%2F${slug}%3Fkey%3Da2fbc003e2d445e19986345bc468db3c`)
        .then (res => {
            console.log('Response:',res);
            setGame(res.data);
            setLoading(false);
        })
        .catch( err => {
            console.log('Error',err);
            setError(err);
            setLoading(false);
        })
    } // loadGameDetails

    if (error) {
        return <p>Could not get game details.</p>
    }

    return (
        <div id="#gameDetailsContainer" className="mb-3">
        {
            loading
            ?
            <Loading />
            :
            <Card className="gameDetails p-4 m-2" key={game.name}>

                <div className="p-2 gameHeader">
                    <Card.Title>{game.name}</Card.Title>
                    <span >{formatDate(game.released)}</span> 
                </div>

                <div className="p-2 gameInfo">
                    <p>Developers: {game.developers[0].name}</p>
                    <p>Platforms: {game.parent_platforms.map( platform => 
                        <span key={platform.platform.name}>{platform.platform.name} | </span>
                        )}</p>
                    <p>Genres: {game.genres.map(genre => 
                        <span key={genre.name}>{genre.name} | </span>
                        )}</p>
                    <span>Metacritic rating:</span> <Badge color="accent">{game.metacritic}</Badge>
                </div>

                <div className="p-2">
                    <Button 
                    className="btn btn-secondary btn-sm"
                    onClick={ () => addToList('wishlist',game) } 
                    >
                        Add to wishlist
                    </Button>
                </div>

                <div className="gameScreenshotsContainer p-2">
                    <h3>Screenshots</h3>
                    <GameScreenshots />
                </div>

                <div className="p-2 mx-auto" style={{textAlign: 'center'}}>
                    <a href={`https://www.rawg.io/games/${game.slug}`}          target="_blank">
                        <Button
                        className="btn btn-outline"
                        >
                            View on RAWG.io
                        </Button>
                    </a>
                </div>

                <BackButton/>
            
            </Card>

        }
            
        </div>
    )
}

export default ViewGame;