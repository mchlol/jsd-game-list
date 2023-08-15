import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Card } from "react-daisyui";
import GameScreenshots from "./GameScreenshots";

function ViewGame () {

    const params = useParams();

    const [game,setGame] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect( () => {
        console.log('Use effect callback!');
        loadGameDetails(params.slug);
    }, [params.slug]);

    function loadGameDetails(slug) {
        setLoading(true);

        const callApi = `https://rawg.io/api/games/${slug}&token&key=${process.env.REACT_APP_API_KEY}`;
        // returns a CORS error

        const url = 'https://corsproxy.io/?' + encodeURIComponent(callApi);
        // returns a bad request error

        // this works but exposes the API key 😤
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
        <div id="#gameDetailsContainer">
        {
            loading
            ?
            <Loading />
            :
            <div className="gameDetails">

                <div className="gameHeader">
                    <h2>{game.name}</h2>
                    <span>{game.released}</span>
                </div>

                <div className="gameInfo">
                    <p>Developers: {game.developers[0].name}</p>
                    <p>Platforms: {game.parent_platforms.map( platform => <span>{platform.platform.name} </span>)}</p>
                    <p>Genres: {game.genres.map(genre => <span>{genre.name} </span>)}</p>
                    <p>Metacritic rating: {game.metacritic}</p>
                </div>

                <div className="gameScreenshotsContainer">
                    <h3>Screenshots</h3>
                    <GameScreenshots />
                </div>
            
            </div>

        }
            
        </div>
    )
}

export default ViewGame;