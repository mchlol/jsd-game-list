# Game List

My final project for General Assembly JavaScript Development.


## Plan

To create a single page app which sends an AJAX request to the RAWG.io video game database API.  
Users can browse games, and create their own lists of games with their own notes added to each game in a list, such as a rating or comment.  

The app will have five 'pages': 
- A home/search page which defaults to a search form and list of games (showing the 20 most popular by default). When the user types a query into the search input, the list of games is populated by games matching the user's search query.  
- a detailed view of a single game from this list or from one of the user's lists - if the user has added notes to a game there should be a way to view these notes from the single game view. 
- a 'my game lists' page, which shows all lists the user has created.  
- a detailed view of a users list, showing the games and any notes the user has added, maybe in a table?  

--- insert wireframe screenshot ----

#### TODO:

<!-- - Back buttons -->
- Pagination for search results (and lists?)
- add header to search results to show what the user searched for
- set up list saving functionality
- delete from list and update on page
<!-- - google font for site header -->
<!-- - navbar alignment -->
- search form alignment
- add github repo link to footer
- stick footer to bottom of page


- Update the readme as I go, including wireframes and screenshots.  
- List any features I may add later.  



## Deployment

The app will be hosted on Netlify [here](https://jsd-game-list.netlify.app/)  
 

## Build and routing

The app is built with React, using React Router to create links. I am also using Tailwind CSS and DaisyUI for Tailwind components.  

## User Data

User data (the custom lists) are saved and retrieved from  `localStorage`.  


## Resources

- figma.com
- https://api.rawg.io/docs
- https://rawgthedocs.orels.sh/api
- https://corsproxy.io/
- https://react.daisyui.com
- https://daisyui.com/docs/
- https://github.com/AdeleD/react-paginate



## Issues

### Pagination

I went around in circles with this for a while. I even tried making a separate component then realised I couldn't get the search query. Eventually I moved the entire axios request into useEffect and installed `react-paginate` to handle the rest. But another problem - I had an if/else to call the API with /games instead of /games/search if the user didn't enter a query. But the render was triggering before the request was finished (even though loading was set to true). I fixed this by using a ternary to decide which url to call. I figured this works within jsx, because if/else does not as it needs to return something.  





