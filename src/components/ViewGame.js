import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading, Card } from "react-daisyui";

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

        const url = 'https://corsproxy.io/?' + encodeURIComponent(callApi);
        

        axios.get('https://corsproxy.io/?https%3A%2F%2Frawg.io%2Fapi%2Fgames%2Fskate%3Fkey%3Da2fbc003e2d445e19986345bc468db3c')
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
        <div>
        {
            loading
            ?
            <Loading />
            :
            <Card >
                <Card.Title>{game.name}</Card.Title>
            </Card>
        }
            
        </div>
    )
}

export default ViewGame;