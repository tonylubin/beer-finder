import { beforeEach, describe, expect, test } from "vitest";
import Card from "../../components/Card/Card";
import beerMockData from "../../assests/beerMockData.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Card tests", () => {

    beforeEach(() => {
        render(<Card beer={beerMockData[0]} />);
    });

    test("should render without error", () => {
        const card = screen.getByRole("article");
        expect(card).toBeInTheDocument();
    });

    test("should render CardFront component", () => {
        const title = screen.getByRole("heading", {level: 2});
        expect(title).toHaveTextContent(/buzz/i);
    });

    test("should render CardBack component", () => {
        const description = screen.getAllByRole("heading", {level: 3});
        expect(description).toHaveLength(4);
        expect(description[0]).toHaveTextContent(/description/i);
    });

    test("should display 2 lists", () => {
        const rearCard = screen.getAllByRole("list");
        expect(rearCard).toHaveLength(2);
    });

    test("when clicked should add/remove rotate class", async () => {
        const card = screen.getByRole("article");
        const user = userEvent.setup();
        await user.click(card);
        expect(card).toHaveClass('cardDisplayRotate');
        await user.click(card);
        expect(card).not.toHaveClass('cardDisplayRotate');
    });
});