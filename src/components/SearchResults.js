import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loading, Card, Button, Pagination } from "react-daisyui";
import { formatDate } from "../functions";
import ReactPaginate from 'react-paginate';


function SearchResults() {

    const params = useParams();

    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);

    useEffect( () => {
        console.log('SearchResults useEffect callback running')

        setLoading(true);

        
        axios.get(params.query ? `https://rawg.io/api/games?search=${params.query}&page=${page}&page_size=&token&key=${process.env.REACT_APP_API_KEY}` : `https://rawg.io/api/games?page=${page}&page_size=20&token&key=${process.env.REACT_APP_API_KEY}`)
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

    },[page]);
    


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
                <div>
                    
                    <h2 className="p-4">Showing results for: "{params.query}"</h2>

                    <div className="searchResults">

                    
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

                    </div>

                    <div className="p-4 flex justify-center">

                        <Pagination>
                            {/* set the next page on button click or go back a page */}
                            <Button 
                            disabled={page === 1} 
                            onClick={ () => setPage( (prevState) => prevState - 1)}
                            className="join-item">
                                ←
                            </Button>

                            <Button 
                            className="join-item">
                                Page {page}
                            </Button>

                            <Button 
                            className="join-item"
                            onClick={ () => setPage( (prevState) => prevState + 1)}>
                                →
                            </Button>

                        </Pagination>
                    </div>

                </div>
                
            }
            
        </div>
        
        </>
    )
}

export default SearchResults;