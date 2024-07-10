import { beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/utils/test-utils";
import SearchBox from "@/components/SearchBox/SearchBox";
import React from "react";


describe("Search input", () => {

  beforeEach(() => {
    render(<SearchBox />)
  });

  test("should display input box", () => {
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
  });

  test('on input typing should update input value', async () => {
    const user = userEvent.setup();
    const searchBar = screen.getByRole("textbox");
    const text = 'lager';
    await user.type(searchBar,text);
    expect(searchBar.value).toEqual(text);
  });


  test("should display loading icon when isPending is true", async () => {

    vi.mock("react", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useTransition: vi.fn((isPending, startTransition) => ([
          isPending = true,
          startTransition = vi.fn(),
        ]))
      }
    });
    const icon = await screen.findByTestId("loader");
    expect(icon).toBeInTheDocument();
  });

});