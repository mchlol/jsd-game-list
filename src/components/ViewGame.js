import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loading } from "react-daisyui";

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

        axios.get(`https://rawg.io/api/games/${slug}&token&key=${process.env.REACT_APP_API_KEY}`)
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
            <p>Game details here</p>
        }
            
        </div>
    )
}

export default ViewGame;