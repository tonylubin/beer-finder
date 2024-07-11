# BEER FINDER APP

Reworked BrewDog's PUNK Api (now deprecated) by using NEXTJS, fullstack framework to integrate into a NoSQL database.

VISIT:  https://find-me-a-beer.vercel.app/

# Outcomes: #

1. ability to search for beers via `name or letter` and page will update on input change  
2. can filter content on 3 conditions:   
    - Low Alcohol (ABV value less than or equal to 4%)  
    - Classic Range (was first brewed before 2010)  
    - Drop down menu for food pairing based on array of keywords
3. demonstrate how to read Api's documentation and use it inside the project & manipulate data

# Design/Display: # 

- mobile first design - viewable across mobile, tablet & laptop
- light and dark theme - using the html `data-*` attribute to target all html elements with css variables for colour scheme
- displays the beers in a card format using CSS Grid & flexbox
- flip card animation for more information
- styled using SASS, css modules and utilised BEM convention
- Fixed postion Header that hides main section of beers when scrolling
- Navigation bar that has a fixed position to enable actions (filtering) to be performed by user whilst scrolling
- beer colour scale chart --> used JS switch statement to highlight beer colour with conditional css classes. 

# Functions: #

- using FETCH with async/await to get data from Api
- utilised Api endpoints and parameters in a 'data service file' (external to component to keep it simple) for the search function and filtering options'
  - URL structure so that filtering is done accordingly by building upon API endpoints in a fetch request e.g:<br>
  base url = `https://api.punkapi.com/v2/beers?page=1`<br>
  search input e.g. `&beer_name=${searchTerm}`<br>
  filter options are added e.g. `&abv_lt=5`, `&brewed_before=01-2010`<br>
  Used array methods `push` & `join` for API URL request with search input at `index[0]` so that "High Alcohol" filter happens on search input result only i.e. on beers search input with "pils" only beers that contain letters "pils" and not on the whole catalogue of beers.<br>
  e.g. `https://api.punkapi.com/v2/beers?page=1&beer_name=pils&abv_lt=5`
- search bar (input) that updates beers to be displayed
- 2 x checkboxes that use a setState to filter beer data via set condition(s)
- using JS array functions (`map, filter, some, includes`) for nested arrays to apply food filter to dataset
- `react-query` - package for data storing & filtering data
- `react-intersection-observer` with `react-query` - to enable inifinte scrolling combined with pagination results/queries from Api.
- `react-loader-spinner"` - loading spinners for animation of data loading & fetching next api page of results 
- unit tested, using JEST/ENZYME

# SCREENSHOTS #

![Project screenshot](./assests/Screenshot1.png)

<br>

![Project screenshot](./assests/Screenshot2.png)


# RUN: #
- clone down repo
- `npm install`
- `npm start`
