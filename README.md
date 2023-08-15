# Final Project 
## Game List

### Plan

To create a single page app which sends an AJAX request to the RAWG.io video game database API.  
Users can browse games, and create their own lists of games with their own notes added to each game in a list, such as a rating or comment.  

The app will have five 'pages': 
- A home/search page which defaults to a search form and list of games (showing the 20 most popular or currently trending by default). When the user types a query into the search input, the list of games is populated by games matching the user's search query.  
- a detailed view of a single game from this list or from one of the user's lists - if the user has added notes to a game there should be a way to view these notes from the single game view. 
- a 'my game lists' page, which shows all lists the user has created.  
- a detailed view of a users list, showing the games and any notes the user has added, maybe in a table?  
- a credits page - link to the RAWG.io (will be on each page as well) and to the github repo.

--- insert wireframe screenshot ----

### Deployment

The app will be hosted on Netlify [here](https://jsd-game-list.netlify.app/)  
The challenge is hiding the API key provided from RAWG, though not specifically requested it seems like the right thing to do.  

### Build and routing

I'll build the SPA with React and use React Router to create links. I might also use Tailwind CSS and DaisyUI for Tailwind components.  

### User Data

I'll use `localStorage` to save the user data.  
I considered using Firebase but hiding the API key and working with React and React Router will be challenging enough given the short timeframe.

### TODO:
- Update the readme as I go, including wireframes and screenshots.  
- List any features I may add later.  

### Resources

- figma.com
- https://api.rawg.io/docs
- https://rawgthedocs.orels.sh/api
- https://corsproxy.io/
- https://react.daisyui.com
- https://daisyui.com/docs/
