const beers = [
  {
    _id: 1,
    name: "Buzz",
    tagline: "A Real Bitter Experience.",
    first_brewed: new Date("2007-09-01T00:00:00Z"),
    description:
      "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    image_url: "keg.webp",
    abv: 4.5,
    ebc: 20,
    food_pairing: [
      "Spicy chicken tikka masala",
      "Grilled chicken quesadilla",
      "Caramel toffee cake",
    ],
    __v: 0,
  },
  {
    _id: 2,
    name: "Trashy Blonde",
    tagline: "You Know You Shouldn't",
    first_brewed: new Date("2008-04-01T00:00:00Z"),
    description:
      "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
    image_url: "2.webp",
    abv: 4.1,
    ebc: 15,
    food_pairing: [
      "Fresh crab with lemon",
      "Garlic butter dipping sauce",
      "Goats cheese salad",
      "Creamy lemon bar doused in powdered sugar",
    ],
    __v: 0,
  },
  {
    _id: 3,
    name: "Berliner Weisse With Yuzu - B-Sides",
    tagline: "Japanese Citrus Berliner Weisse.",
    first_brewed: new Date("2015-11-01T00:00:00Z"),
    description:
      "Japanese citrus fruit intensifies the sour nature of this German classic.",
    image_url: "keg.webp",
    abv: 4.2,
    ebc: 8,
    food_pairing: ["Smoked chicken wings", "Miso ramen", "Yuzu cheesecake"],
    __v: 0,
  },
  {
    _id: 4,
    name: "Pilsen Lager",
    tagline: "Unleash the Yeast Series.",
    first_brewed: new Date("2013-09-01T00:00:00Z"),
    description:
      "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
    image_url: "4.webp",
    abv: 6.3,
    ebc: 30,
    food_pairing: [
      "Spicy crab cakes",
      "Spicy cucumber and carrot Thai salad",
      "Sweet filled dumplings",
    ],
    __v: 0,
  },
  {
    _id: 5,
    name: "Avery Brown Dredge",
    tagline: "Bloggers' Imperial Pilsner.",
    first_brewed: new Date("2011-02-01T00:00:00Z"),
    description:
      "An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.",
    image_url: "5.webp",
    abv: 7.2,
    ebc: 10,
    food_pairing: [
      "Vietnamese squid salad",
      "Chargrilled corn on the cob with paprika butter",
      "Strawberry and rhubarb pie",
    ],
    __v: 0,
  },
];

export default beers;
