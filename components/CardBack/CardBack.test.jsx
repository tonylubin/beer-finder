import { mount } from "enzyme";
import CardBack from "../CardBack/CardBack";
import beerMockData from "../../assests/beerMockData";


describe("CardBack tests", () => {
  let wrapper;
  let mockBeer;

  beforeEach(() => {
    mockBeer = beerMockData[0];
    wrapper = mount(
      <CardBack
        description={mockBeer.description}
        first_brewed={mockBeer.first_brewed}
        ph={mockBeer.ph}
        food_pairing={mockBeer.food_pairing}
        ibu={mockBeer.ibu}
      />
    );
  });

  it("should render without error", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render the correct name", () => {
    expect(wrapper.find(".foodPairing").text()).toMatch(mockBeer.description);
    
  });

  it("should display exact number of food pairings as a list", () => {
    expect(wrapper.find(".foodList").children()).toHaveLength(mockBeer.food_pairing.length);
  });
});
