import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Button, Carousel } from "react-daisyui";

function GameScreenshots() {
    const params = useParams();
    const navigate = useNavigate();

    const [screenshots,setScreenshots] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect( () => {
        // console.log('GameScreenshots useEffect callback');
        loadScreenshots(params.slug);
    }, [params.slug]);

    function loadScreenshots(slug) {
        setLoading(true);

        // `https://rawg.io/api/games/${slug}/screenshots/&token&key=${process.env.REACT_APP_API_KEY}`
        // cors error

        // `https://corsproxy.io/?https%3A%2F%2Frawg.io%2Fapi%2Fgames%2F${slug}%2Fscreenshots%3Fkey%3Da2fbc003e2d445e19986345bc468db3c`

        axios.get(`https://corsproxy.io/?https%3A%2F%2Frawg.io%2Fapi%2Fgames%2F${slug}%2Fscreenshots%3Fkey%3Da2fbc003e2d445e19986345bc468db3c`)
        .then( res => {
            // console.log('Response:',res);
            setScreenshots(res.data.results);
            // console.log('Screenshots:',screenshots);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error:',err);
            setError(err);
            setLoading(false);
        })
    } // loadScreenshots

    if (error) {
        return <p>Could not load screenshots.</p>
    }

    return (
        <div>
            {
                loading
                ?
                <Loading />
                :
                <Carousel className="rounded-box">
                { screenshots.map( screenshot =>

                    <Carousel.Item key={screenshot.id} className="game-screenshot" 
                    src={screenshot.image} 
                    alt="game screenshot" 
                    />
                
                )}
                </Carousel>
                
            }
            
        </div>
    )


} // GameScreenshots component

export default GameScreenshots;
