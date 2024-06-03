import { beforeEach, describe, expect, test } from "vitest";
import { mount } from "enzyme";
import Card from "../Card/Card.jsx";
import beerMockData from "../../assests/beerMockData.js";
import CardFront from "../CardFront/CardFront.jsx";
import CardBack from "../CardBack/CardBack.jsx";

describe("Card tests", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Card beer={beerMockData[0]} />)
    })

    test("should render without error", () => {
        expect(wrapper).toBeTruthy();
    })

    test("should render CardFront component", () => {
        expect(wrapper.contains(CardFront)).toBeTruthy();
    });

    test("should render CardBack component", () => {
        expect(wrapper.contains(CardBack)).toBeTruthy();
    });

    test("when clicked should add rotate class", () => {
        wrapper.find('.cardDisplay').simulate('click');
        expect(wrapper.find('.cardDisplayRotate')).toBeTruthy()
    })
})