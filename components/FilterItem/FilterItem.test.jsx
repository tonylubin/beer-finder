import { shallow } from "enzyme";
import FilterItem from "./FilterItem";
import { vi } from "vitest";

describe("FilterItem tests", () => {

    let wrapper;
    let mockFn = vi.fn();

    const filterInfo = {
        name: "abv",
        type: "checkbox",
        id: "abv",
        description: "High Abv",
        checkboxFunc: mockFn,
    }

    beforeEach(() => {
        wrapper = shallow(<FilterItem name={filterInfo.name} type={filterInfo.type} id={filterInfo.id} description={filterInfo.description} checkboxFunc={filterInfo.checkboxFunc} />);
    })

    it("label displays the description props", () => {
        expect(wrapper.find('label').text()).toBe(filterInfo.description);
    })

    it("input should have correct name", () => {
        expect(wrapper.find('input').prop('name')).toBe(filterInfo.name);
    })

    it("should call function when input changes state", () => {
        wrapper.find('input').simulate('change');
        expect(mockFn).toHaveBeenCalled();
    })

})