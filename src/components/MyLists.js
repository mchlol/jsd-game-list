import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Button, Badge } from "react-daisyui";
// import { formatDate } from "../functions";
import BackButton from "./BackButton";
// import { removeFromList, getList } from "../functions";

function MyLists() {

    const navigate = useNavigate();

    // retrieve a list

    const [wishlist,setWishlist] = useState([]);
    const [favourites,setFavourites] = useState([]);
    const [played,setPlayed] = useState([]);
    const [listChanged,setListChanged] = useState(false);

    useEffect( () => {
        // console.log('My lists useEffect callback running');
        const wishlist = JSON.parse(localStorage.getItem('wishlist'));
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        const played = JSON.parse(localStorage.getItem('played'));
        // console.log('wishlist:',wishlist);

        if (wishlist) {
            setWishlist(wishlist); 
        }

        if (favourites) {
            setFavourites(favourites);
        }

        if (played) {
            setPlayed(played);
        }

    }, [listChanged]); 

    const removeFromList = function(listName, gameObj) {
        // console.log(`Deleting ${gameObj.slug} from ${listName}`);
    
        // make a copy of the list in a variable
        const getList = JSON.parse(localStorage.getItem(listName));
    
        // get the index in the list's array of the specified object
        const gameId = gameObj.id; // the value to search for
    
        const foundId = getList.findIndex( (element) => element.id === gameId);
        // console.log('Found ID:',foundId) // returns the index of the obj with matching id
    
        // use a method to remove the object with matching id from the list - slice? nope - sPlice
        getList.splice(foundId, 1);
        // console.log(getList);
        // save over the list in storage with the new value
        localStorage.setItem(listName,JSON.stringify(getList));

        // how to refresh the component?
        setListChanged(true); // set this value as the useEffect dependency so the component only re-renders when this value changes 

        // update the list in state
        setWishlist(getList);
    }

    return (

        <div id="viewLists" className="p-4">

            <div id="aboutLists" className="p-2">
                <h2 className="text-xl text-center">My Lists</h2>

                <Badge className="m-2 p-4 badge badge-secondary badge-sm"
                style={{margin: '0.5rem'}}>
                    Wishlist
                </Badge>

                <Badge className="m-2 p-4 badge badge-secondary badge-sm"
                style={{margin: '0.5rem'}}>
                    Favourites
                </Badge>

                
                <Badge className="m-2 p-4 badge badge-secondary badge-sm"
                style={{margin: '0.5rem'}}>
                    Played
                </Badge>

                {/* To be added */}
                {/* <Badge className="m-2 p-4 badge badge-outline badge-accent badge-sm"
                style={{margin: '0.5rem'}}>
                    Add New +
                </Badge> */}

            </div>

            <div id="listOfLists" className="p-2 grid grid-cols-3">
                {/* TODO: these should be components */}

                <div className="p-2 border">
                    <h3 id="playedHeading">Played</h3>
                    {
                        played.length > 0
                        ?
                        <ul className="list-disc searchResults">
                        { played.map( game =>
                            <Card 
                            className="max-w-md game-card"
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
                                            removeFromList('played',game)
                                        }}>
                                            Delete
                                        </Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card> 
                    ) } 
                        </ul>
                        :
                        <p>No played games to display.</p>
                    }
                    </div>

                    <div className="p-2 border">
                        <h3 id="wishlistHeading">Wishlist</h3>
                    {
                        wishlist.length > 0
                        ?
                        
                        <ul className="list-disc searchResults">
                        { wishlist.map( game =>
                            <Card 
                            className="max-w-md game-card"
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
                        
                        :
                        <p>No games in wishlist.</p>
                    }
                    </div>

                    <div className="p-2 border">
                        <h3 id="favouritesHeading">Favourites</h3>
                    {
                        favourites.length > 0
                        ?
                        
                        <ul className="list-disc searchResults">
                        { favourites.map( game =>
                            <Card 
                            className="max-w-md game-card"
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
                                            removeFromList('favourites',game)
                                        }}>
                                            Delete
                                        </Button>
                                    </Card.Actions>
                                </Card.Body>
                            </Card> 
                    ) } 
                        </ul>
                    
                    :
                    <p>No favourites to display.</p>
                    }
                    </div>

                    

            </div>

            <BackButton />
        </div>
    )
}

export default MyLists;