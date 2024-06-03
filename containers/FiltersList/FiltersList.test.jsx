import { mount, shallow } from "enzyme";
import FiltersList from "./FiltersList";
import FilterItem from "../FilterItem/FilterItem";
import { vi } from "vitest";

describe("FiltersList tests", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(<FiltersList />);
  });

  it("should render without error", () => {
    expect(wrapper).toBeTruthy();
  });

  it("check if child renders 3 times", () => {
    expect(wrapper.find(FilterItem).length).toEqual(2);
  });

  it("should call function when checkbox is clicked", () => {
    let mockfn = vi.fn();
    let component = shallow(<FilterItem checkboxFunc={mockfn}/>);

    component.find('input').simulate('change');
    expect(mockfn).toHaveBeenCalled();
  })

});
