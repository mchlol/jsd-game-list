import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Card, Button, Badge } from "react-daisyui";
import GameScreenshots from "./GameScreenshots";
import BackButton from "./BackButton";
import { formatDate, joinArray, joinPlatformArray } from "../functions";

function ViewGame () {

    const params = useParams();
    const navigate = useNavigate();

    const [game,setGame] = useState('');
    const [gameRecs,setGameRecs] = useState([]);
    const [gameIsInList,setGameIsInList] = useState(false);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect( () => {
        loadGameDetails(params.slug);
        getRecommendations(params.slug);
    }, [params.slug]);

    function loadGameDetails(slug) {
        setLoading(true);

        const callApi = `https://rawg.io/api/games/${slug}&token&key=${process.env.REACT_APP_API_KEY}`;
        // same call as for SearchResults but for a specific game it returns a CORS error... sometimes

        const url = 'https://corsproxy.io/?' + encodeURIComponent(callApi);
        // now it returns a bad request error

        // this works just fine...but exposes the API key 😤
        axios.get(`https://corsproxy.io/?https%3A%2F%2Frawg.io%2Fapi%2Fgames%2F${slug}%3Fkey%3Da2fbc003e2d445e19986345bc468db3c`)
        .then (res => {
            console.log('Response:',res);
            setGame(res.data);

            // formatDate isn't called until setGame has a value
            // even if loading is not set to false until the object has definitely loaded
            if (game) {
                setLoading(false)
            }

        })
        .catch( err => {
            console.log('Error',err);
            setError(err);
            setLoading(false);
        })
    } // loadGameDetails

    function getRecommendations(slug) {
        setLoading(true);
        // no CORS error and no exposing API key
        axios.get(`https://rawg.io/api/games?search=${slug}&page=1&page_size=3&token&key=${process.env.REACT_APP_API_KEY}`)

        .then(res=> {
            setGameRecs(res.data.results);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error',err);
        })
    } // getRecommendations

    function handleClick(listName,gameObj,ev) {
        console.log('Adding game to ' + listName,gameObj);

        // TODO: toggle game add to/remove from list, and corresponding button style
        // when the button (ev) is clicked;
        // check the specified list for gameObj
        // if it is present, remove it, and call button style func with false
        // if it is not present add it, and call button style func with true

        // TODO: split into 2 functions for local storage handling and button style handling
        // 1. local storage
        // get the key 'listName' from local storage & parse it
        // check if it has a value & that value is an array
        // if so, push gameObj to it
        // if not, create the key with [gameObj]

        const storedList = JSON.parse(localStorage.getItem(listName));
        // console.log('check list first',list);
        const button = ev.target;
        console.log(button);
            if (!gameInList(listName,gameObj)) {
                console.log('game was not already added')
                storedList.push(gameObj);
                localStorage.setItem(listName,JSON.stringify(storedList));
                buttonStyle(true,button,listName);
            } else {
                console.log('game is already added to this list');
                buttonStyle(false,button,listName);
            }

    } // handleClick

    function gameInList(listName,gameObj) {
        // this function should correspond to state 'gameIsInList'
        console.log(`Checking ${listName} for ${gameObj.name}`);

        // get the key 'listName' from local storage & parse it
        const list = JSON.parse(localStorage.getItem(listName));

        // check if it has a value & that value is an array
        if (list && Array.isArray(list)) {
            // check if the obj already exists in the list array
            // get the index in the list's array of the specified object
            const gameId = gameObj.id; // the value to search for
            const foundId = list.findIndex( (element) => element.id === gameId);

            if (foundId === -1) {
                console.log('game is not in list');
                return false;
            
            } else {
                console.log('game is in list')
                return true;
            }
        } 
    } // gameInList

    function buttonStyle(inList,button,listName) {
            if (inList) {
                button.className = 'btn btn-success btn-sm';
            } else {
                button.className = 'btn btn-secondary btn-sm';
            }
            button.textContent = `in ${listName}`;
    }



    // attempt to encode html entities
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
                    { <img src={game.background_image} alt={game.name} /> }
                </div>

                

                <div className="p-2 gameInfo">
                    <p><strong>Released:</strong> <span >{formatDate(game.released)}</span> </p>
                    <p><strong>Developers:</strong> {joinArray(game.developers)}</p>
                    <p><strong>Platforms:</strong> {joinPlatformArray(game.parent_platforms)}</p>
                    <p><strong>Genres:</strong> {joinArray(game.genres)}</p>
                    <span><strong>Metacritic rating:</strong></span> {game.metacritic ? <Badge color="accent">{game.metacritic}</Badge> : <span>N/A</span> }
                </div>

                <div className="p-2">
                {/* if game is in list, determine button text and style 
                1. check localStorage if gameObj is in listName
                2. if true, button class 'btn-success' & text 'in listName'
                3. if false, button class 'btn-secondary' & text 'add to listName'
                4. toggle add/remove from list on button click - & mirror to localStorage */}
                    <Button 
                    className="btn btn-secondary btn-sm"
                    style={{margin: '0.5rem'}}
                    onClick={ ev => {
                        handleClick('wishlist',game,ev);
                    }} 
                    >
                        Add to wishlist
                    </Button>

                    <Button 
                    className="btn btn-secondary btn-sm"
                    style={{margin: '0.5rem'}}
                    onClick={ ev => {
                        handleClick('favourites',game,ev);
                    }} 
                    >
                    
                        Add to favourites
                    </Button>

                    <Button 
                    className="btn btn-secondary btn-sm"
                    style={{margin: '0.5rem'}}
                    onClick={ ev => {
                        handleClick('played',game,ev);
                    }} 
                    >
                        Add to played
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