import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Button } from "react-daisyui";
// import { formatDate } from "../functions";
import BackButton from "./BackButton";
// import { removeFromList, getList } from "../functions";

function MyLists() {

    const navigate = useNavigate();

    // retrieve a list

    const [wishlist,setWishlist] = useState([]);
    const [listChanged,setListChanged] = useState(false);

    useEffect( () => {
        console.log('My lists useEffect callback running');
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        console.log('wishlist:',wishlist);

        if (wishlist) {
            setWishlist(wishlist); // this can't be here 
        }

    }, [listChanged]); // if this array is empty, the component wont re-render when the value of the list changes (a game is deleted) - but if we put wishlist in it, it triggers an infinite loop
    // the infinite loop happens because useEffect is calling setWishlist effectively changing the value, so the component continues to rerender - set the value, render, set the value, render etc. 
    // how to display the list on mount, and also re-render if that value changes?

    const removeFromList = function(listName, gameObj) {
        console.log(`Deleting ${gameObj.slug} from ${listName}`);
    
        // make a copy of the list in a variable
        const getList = JSON.parse(localStorage.getItem(listName));
    
        // get the index in the list's array of the specified object
        const gameId = gameObj.id; // the value to search for
    
        const foundId = getList.findIndex( (element) => element.id === gameId);
        console.log('Found ID:',foundId) // returns the index of the obj with matching id
    
        // use a method to remove the object with matching id from the list - slice? nope - sPlice
        getList.splice(foundId, 1);
        console.log(getList);
        // save over the list in storage with the new value
        localStorage.setItem(listName,JSON.stringify(getList));

        // how to refresh the component?
        setListChanged(true); // set this value as the useEffect dependency so the component only re-renders when this value changes 
        // but this only works once?
        setWishlist(getList);
    }

    return (
        <div id="viewLists" className="p-4">

            <div id="aboutLists" className="p-2">
                <h2 className="text-xl text-center">My Lists</h2>

                {/* ## if there were multiple lists this is where they would go: ##
                <span>Jump to: </span> 
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