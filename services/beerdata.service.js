export const getBeerData = async (
  searchItem,
  abvFilter,
  classicFilter,
  pageParam
) => {
  const BASE_API_URL = `https://api.punkapi.com/v2/beers?page=${pageParam}`;

  let searchCriteria = searchItem
    ? `&beer_name=${searchItem}`
    : `&${searchItem}`;

  let searchTermUrl = [];
  if (abvFilter) searchTermUrl.push("&abv_lt=4.1");
  if (classicFilter) searchTermUrl.push("&brewed_before=01-2010");

  let urlRequest = searchTermUrl.length
    ? `${BASE_API_URL}${searchCriteria}&${searchTermUrl.join("")}`
    : `${BASE_API_URL}${searchCriteria}`;

  const response = await fetch(urlRequest);

  const beerData = await response.json();

  return beerData;
};

export const addFoodFilter = (beersData, foodItem) => {
  // filter for food pairing
  const foodTermLib = {
    meat: ["chicken", "pork", "beef", "veal", "bacon", "lamb", "ham", "steak"],
    seafood: ["fish", "cod", "tuna", "prawns", "lobster", "crab", "mussels"],
    spicy: ["spicy", "chillies", "hot", "fiery", "curry"],
    sweet: ["sweet", "dessert", "pudding", "tart", "custard"],
  };

  const filterFoodTerm = (arr) => {
    const filteredBeersData = beersData.pages.map((item) => {
      return item.filter((beer) => {
        // string array of each meal
        const foodPairings = beer.food_pairing.map((food) =>
          food.toLowerCase().split(" ")
        );
        // check if words included in meal
        const foodSearch = foodPairings.map((meal) => {
          return arr.some((ingredient) => meal.includes(ingredient));
        });
        // returns if result is true
        const check = foodSearch.some((el) => el === true);
        return check;
      });
    });
    return filteredBeersData;
  };

  // eslint-disable-next-line default-case
  switch (foodItem) {
    case "meat":
      return filterFoodTerm(foodTermLib.meat);
    case "seafood":
      return filterFoodTerm(foodTermLib.seafood);
    case "spicy":
      return filterFoodTerm(foodTermLib.spicy);
    case "sweet":
      return filterFoodTerm(foodTermLib.sweet);
  }
};
