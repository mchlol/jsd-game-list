import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Button } from "react-daisyui";
// import { formatDate } from "../functions";
import BackButton from "./BackButton";
import { removeFromList } from "../functions";

function MyLists() {

    const navigate = useNavigate();

    // retrieve a list

    const [wishlist,setWishlist] = useState([]);

    useEffect( () => {
        console.log('My lists useEffect callback running');

        // localStorage should look like { wishlist: [ {obj}, {obj}, ] }

        // create a key in local storage called 'wishlist' with an array to start pushing game objects
        // cant do this until the user goes to add something or it will be overwritten with an empty array?
        // create the key and put the required object in its array

        // localStorage.setItem('wishlist', JSON.stringify([]));


        // check if there is a wishlist key in localstorage

        setWishlist(JSON.parse(localStorage.getItem('wishlist')));
        // adding to wish list is handled on the details page
        console.log('Wishlist:',wishlist);

    }, []); // if this array is empty, the component wont re-render when the value of the list changes (a game is deleted) - but if we put wishlist in it, it triggers an infinite loop


    return (
        <div id="viewLists" className="p-4">

            <div id="aboutLists" className="p-2">
                <h2 className="text-xl text-center">My Lists</h2>

                {/* <span>Jump to: </span> 
                <a href="#wishlistHeading"><button className="badge badge-primary">Wishlist</button></a> 
                | 
                <a href="#favlistHeading"><button className="badge badge-primary">Favourites</button></a> 
                | 
                <a href="#playedlistHeading"><button className="badge badge-primary">Played</button></a> 
                | 
                <button className="badge badge-outline badge-accent badge-l">Add New +</button> */}
            </div>

            <div id="listOfLists" className="p-2 grid grid-cols-2">

                    <div className="p-2 border">
                        <h3 id="wishlistHeading">Wishlist</h3>
                        <ul className="list-disc searchResults">
                        { wishlist.map( game =>
                            <Card 
                            className="p-4 max-w-md game-card"
                            key={game.slug} 
                            >
                                <Card.Image className="gameImg" src={game.background_image} alt={game.name} />
                                
                                <Card.Body>
                                    <Card.Title tag="h2">{game.name}
                                </Card.Title>

                                    <Card.Actions className="justify-end">
                                        <Button 
                                            className="btn btn-sm btn-primary"
                                            onClick={ () => navigate(`/game/${game.slug}`)} 
                                            >
                                            View
                                        </Button>
                                        <Button 
                                        className="btn btn-sm btn-accent"
                                        onClick={ () => {
                                            removeFromList('wishlist',game)
                                        }}>
                                            Delete
                                        </Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card> 
                    ) } 
                        </ul>
                    </div>

            </div>

            <BackButton />
        </div>
    )
}

export default MyLists;