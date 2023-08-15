import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Button} from "react-daisyui";
import { formatDate } from "../functions";

function MyLists() {

    const navigate = useNavigate();

    // retrieve a list

    const [wishlist,setWishlist] = useState([]);

    useEffect( () => {
        console.log('My lists useEffect callback running');

        // localStorage should look like { wishlist: [ {obj}, {obj}, ] }

        // create a key in local storage called 'wishlist' with an array to start pushing game objects
        // cant do this until the user goes to add something
        // create the key and put the required object in its array

        // localStorage.setItem('wishlist', JSON.stringify([]));


        // check if there is a wishlist key in localstorage

        setWishlist(JSON.parse(localStorage.getItem('wishlist')));

        console.log(wishlist);

    }, []); 
    

    return (
        <div id="viewLists" className="p-4">

            <div id="aboutLists" className="p-2">
                <h2>My Lists</h2>
                <p>Shows lists of games, each game title links to the ViewGame component for that game and has a delete badge to remove it from the list.</p>
            </div>

            <div id="listOfLists" className="p-2 border grid grid-cols-2">

                    <div className="p-2 border">
                        <h3>Wishlist</h3>
                        <ul className="list-disc">
                        { wishlist.map( game =>
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
                        </ul>
                    </div>

            </div>
        </div>
    )
}

export default MyLists;