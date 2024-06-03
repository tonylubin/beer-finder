import { mount } from "enzyme";
import Main from "./Main";


describe("Main component tests", () => {
    let wrapper;
    
    let data = {
        pages: [
        [
            {
            id: 1,
            name: "Buzz",
            tagline: "A Real Bitter Experience.",
            first_brewed: "09/2007",
            description:
                "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
            image_url: "https://images.punkapi.com/v2/keg.png",
            abv: 4.5,
            ibu: 60,
            ebc: 20,
            ph: 4.4,
            food_pairing: [
                "Spicy chicken tikka masala",
                "Grilled chicken quesadilla",
                "Caramel toffee cake",
            ],
            brewers_tips:
                "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
            contributed_by: "Sam Mason <samjbmason>",
            },
            {
            id: 2,
            name: "Trashy Blonde",
            tagline: "You Know You Shouldn't",
            first_brewed: "04/2008",
            description:
                "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
            image_url: "https://images.punkapi.com/v2/2.png",
            abv: 4.1,
            ibu: 41.5,
            ebc: 15,
            ph: 4.4,
            food_pairing: [
                "Fresh crab with lemon",
                "Garlic butter dipping sauce",
                "Goats cheese salad",
                "Creamy lemon bar doused in powdered sugar",
            ],
            brewers_tips:
                "Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.",
            contributed_by: "Sam Mason <samjbmason>",
            },
        ],
        [
            {
            id: 1,
            name: "Buzz",
            tagline: "A Real Bitter Experience.",
            first_brewed: "09/2007",
            description:
                "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
            image_url: "https://images.punkapi.com/v2/keg.png",
            abv: 4.5,
            ibu: 60,
            ebc: 20,
            ph: 4.4,
            food_pairing: [
                "Spicy chicken tikka masala",
                "Grilled chicken quesadilla",
                "Caramel toffee cake",
            ],
            brewers_tips:
                "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
            contributed_by: "Sam Mason <samjbmason>",
            },
            {
            id: 2,
            name: "Trashy Blonde",
            tagline: "You Know You Shouldn't",
            first_brewed: "04/2008",
            description:
                "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
            image_url: "https://images.punkapi.com/v2/2.png",
            abv: 4.1,
            ibu: 41.5,
            ebc: 15,
            ph: 4.4,
            food_pairing: [
                "Fresh crab with lemon",
                "Garlic butter dipping sauce",
                "Goats cheese salad",
                "Creamy lemon bar doused in powdered sugar",
            ],
            brewers_tips:
                "Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.",
            contributed_by: "Sam Mason <samjbmason>",
            },
        ],
        ],
    };


    it("should render without error", () => {
        wrapper = mount(<Main beerData={data} />);
        expect(wrapper).toBeTruthy();
    });

    it("should accept render 4 amount of cards", () => {
        wrapper = mount(<Main beerData={data} />);
        expect(wrapper.find('article')).toHaveLength(data.pages.flat().length);
    });

    it("when no results should display a message", () => {
        let noData = { pages: [] };
        wrapper = mount(<Main beerData={noData} />);
        expect(wrapper.find('.notFound').text()).toMatch('Sorry, no beers were found');
    });

    it("when fetching next results page should render loading spinner", () => {
        wrapper = mount(<Main beerData={data} isFetchingNextPage={true} />);
        expect(wrapper.find('ThreeDots')).toBeTruthy();
    });
    
});
