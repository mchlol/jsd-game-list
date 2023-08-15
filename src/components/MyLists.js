import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Card, Button } from "react-daisyui";
import { formatDate } from "../functions";


function MyLists() {

    const params = useParams();

    const navigate = useNavigate();

    const [list,setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        console.log('My list useEffect callback running');
        loadList(params.query)
    }, [params.query]);
    
    function loadList (query) {
        setLoading(true);

        // user will curate a list - the list is an array of game slugs
        // stored in localStorage

        // do we have to make an ajax request for each game slug in a list?

        // eg. query would be each individual slug in the list/array
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
        return <p>Could not load list.</p>
    }

    return (
        <>
        <div>
            {
                loading
                ?
                <Loading />
                :
                <div id="userList">

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

                    <Button
                    onClick={ () => navigate(-1)}>
                    Back
                    </Button>
                </div>
                
            }
            
        </div>
        
        </>
    )
}

export default MyLists;