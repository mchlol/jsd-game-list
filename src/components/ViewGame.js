import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Card, Button, Badge } from "react-daisyui";
import GameScreenshots from "./GameScreenshots";
import BackButton from "./BackButton";
import { addToList, formatDate, joinArray, joinPlatformArray } from "../functions";

function ViewGame () {

    const params = useParams();
    const navigate = useNavigate();

    const [game,setGame] = useState('');
    const [gameRecs,setGameRecs] = useState([]);
    const [button,setButton] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect( () => {
        loadGameDetails(params.slug);
        getRecommendations(params.slug);
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

    function getRecommendations(slug) {
        setLoading(true);
        axios.get(`https://rawg.io/api/games?search=${slug}&page=1&page_size=3&token&key=${process.env.REACT_APP_API_KEY}`)

        .then(res=> {
            // console.log('Recommendations:',res.data.results);
            setGameRecs(res.data.results);
            setLoading(false);
            // console.log(gameRecs);
        })
        .catch(err => {
            console.log('Error',err);
        })
    } // getRecommendations

    function handleClick(listName,gameObj,ev) {
        // if the wishlists array from useEffect calls its data from localStorage
        // we can just add a game object to it
        console.log('Adding game to ' + listName,gameObj);
        const list = JSON.parse(localStorage.getItem(listName));

        // check if the obj already exists in the list array

        // get the index in the list's array of the specified object
        const gameId = gameObj.id; // the value to search for
    
        const foundId = list.findIndex( (element) => element.id === gameId);
        console.log('Found ID:',foundId) // returns the index of the obj with matching id

        console.log('button',ev.target); 
        const button = ev.target;
        button.className = 'btn btn-success btn-sm';
        if (foundId === -1) {
            list.push(gameObj);
            
        } else {
            console.log('game is already added to this list')
        }
        

        console.log(list);

        localStorage.setItem(listName,JSON.stringify(list));

    } // handleClick



    // attempt to encode html entities?
    function parseText(str) {
        let text = new DOMParser().parseFromString(str, "text/html");
        return text.documentElement.innerText;
    }

    if (error) {
        return <p>Could not get game details.</p>
    }

    return (
        <div id="#gameDetailsContainer" className="mb-3">
        {
            loading
            ?
            <div className="p-4 flex justify-center">
                <Loading color="primary"/>
            </div>
            :
            <Card className="gameDetails p-4 m-2" 
            id="viewGame" 
            key={game.name}
            >

                <Card.Title className="p-2 gameHeader text-2xl">{game.name}</Card.Title>

                <div className="p-2 gameHeaderImg">
                    { <img src={game.background_image} alt="{game.name}" /> }
                </div>

                

                <div className="p-2 gameInfo">
                    <p><strong>Released:</strong> <span >{formatDate(game.released)}</span> </p>
                    <p><strong>Developers:</strong> {joinArray(game.developers)}</p>
                    <p><strong>Platforms:</strong> {joinPlatformArray(game.parent_platforms)}</p>
                    <p><strong>Genres:</strong> {joinArray(game.genres)}</p>
                    <span><strong>Metacritic rating:</strong></span> {game.metacritic ? <Badge color="accent">{game.metacritic}</Badge> : <span>N/A</span> }
                </div>

                <div className="p-2">
                    <Button 
                    className="btn btn-secondary btn-sm"
                    onClick={ ev => {
                        handleClick('wishlist',game,ev);
                    }} 
                    >
                        Add to wishlist
                    </Button>
                </div>

                <div className="p-2">
                    <p>{parseText(game.description)}</p>
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

                <div className="p-2">
                    <h3>Recommendations:</h3>
                    <div>
                        {gameRecs.map(rec => 
                            <p key={rec.slug}
                            onClick={ () => navigate(`/game/${rec.slug}`)}
                            >
                                {rec.name}
                            </p>
                        )}
                    </div>
                </div>

                <BackButton/>
            
            </Card>

        }
            
        </div>
    )
}

export default ViewGame;