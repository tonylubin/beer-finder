import React from "react";
import { shallow } from "enzyme";
import SearchBox from "./SearchBox";
import { vi } from "vitest";

describe("SearchBox functionality", () => {

    let mockfn;
    let wrapper;

    beforeEach(() => {
        mockfn = vi.fn();
        wrapper = shallow(<SearchBox setSearchItem={mockfn}/>);
    })

    it("should render", () => {
        expect(wrapper).toBeTruthy();
    })

    it("should render a input with a type of text", () => {
        expect(wrapper.find('input').prop('type')).toBe('text');
    })

    it("should call function with user input", () => {
        wrapper.find('input').simulate('input', {target:{value:'p'}});
        expect(mockfn).toHaveBeenCalledWith('p');       
    })

    it("should call function", () => {
        wrapper.find('input').simulate('input', {target:{value:'p'}});
        expect(mockfn).toHaveBeenCalled();       
    })

});