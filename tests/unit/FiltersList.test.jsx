import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import FiltersList from "@/containers/FiltersList/FiltersList.jsx";


describe("Filters List", () => {

  beforeEach(() => {
    render(<FiltersList />)
  });

  test("should display 2 input checkboxes", () => {
    const checkbox = screen.getAllByRole("checkbox");
    expect(checkbox).toHaveLength(2);
  });

  test("select input should have 5 options", () => {
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);
  });

});