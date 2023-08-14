import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Card, Button } from "react-daisyui";

const formatDate = function(date) {
    // date is always formatted YYYY-MM-DD
    const year = date.slice(0,4);
    let month = date.slice(5,7);
    const day = date.slice(8,10)

    switch(month) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = "March";
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
        default:
            console.log('Could not determine month');
    }
    let dateString = `${day} ${month} ${year}`;
    return dateString;
}; // formatDate

function SearchResults() {

    const params = useParams();

    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        console.log('useEffect callback running');
        loadSearchResults(params.query);
    }, []);
    
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
        <div id="searchResults">
            {
                loading
                ?
                <Loading />
                :
                
                games.map( game =>
                <Card 
                className="max-w-md game-card"
                onClick={ () => navigate(`/${game.slug}`)} 
                key={game.slug} 
                >
                    <Card.Image className="gameImg" src={game.background_image} alt={game.name} />
                    
                    <Card.Body>
                        <Card.Title tag="h2">{game.name}
                    </Card.Title>
                        <span className="spanFormat">Released ({formatDate(game.released)})</span>
                        <Card.Actions className="justify-end">
                            <Button className="btn btn-sm btn-primary">View</Button>
                        </Card.Actions>
                    </Card.Body>
                </Card> 
                )
            }
            
        </div>
        <Button>Next Page →</Button>
        </>
    )
}

export default SearchResults;