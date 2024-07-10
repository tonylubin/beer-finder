import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import clientPromise from "@/utils/mongodb";
import * as utils from "@/utils/actions";
import InfiniteScroll from "@/containers/InfiniteScroll/InfiniteScroll";
import beers from "@/assests/beerMockData";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";


vi.mock("../../utils/mongodb.js", () => {
  return {
    default: {
      clientPromise: vi
        .fn()
        .mockImplementation(() => clientPromise(globalThis.__MONGO_URI__)),
    },
  };
});

vi.mock("../../utils/actions.js");

describe("Main section", () => {
  test("should display message if no results found", () => {
    const mockPaginatedFunc = vi.mocked(utils.paginatedResults);
    const mockPaginatedRes = mockPaginatedFunc.mockImplementation(() => []);

    render(<InfiniteScroll beerData={mockPaginatedRes} />);
    const msg = screen.getByText("Sorry, no beers were found");
    expect(msg).toBeInTheDocument();
  });

  test("should display all results from database", () => {
    const mockPaginatedFunc = vi.mocked(utils.paginatedResults);
    const mockPaginatedRes = mockPaginatedFunc.mockImplementation(() => beers);

    render(<InfiniteScroll beerData={mockPaginatedRes} />);

    const card = screen.getAllByRole("article");
    expect(card).toHaveLength(5);
  });

  test("should display loader icon when end of results hits intersection observer in view", () => {
    const mockPaginatedFunc = vi.mocked(utils.paginatedResults);
    const mockPaginatedRes = mockPaginatedFunc.mockReturnValue(beers);
    
    render(<InfiniteScroll beerData={mockPaginatedRes} collectionCount={10} />);
   
    mockAllIsIntersecting(true)
    const loader = screen.getByTestId("next-page");
    expect(loader).toBeInTheDocument();
  });

  test("should not display loader icon when end intersection observer not in view", () => {
    const mockPaginatedFunc = vi.mocked(utils.paginatedResults);
    const mockPaginatedRes = mockPaginatedFunc.mockReturnValue(beers);
    
    render(<InfiniteScroll beerData={mockPaginatedRes} collectionCount={5} />);
   
    mockAllIsIntersecting(false)
    const loader = screen.queryByTestId("next-page");
    expect(loader).not.toBeInTheDocument();
  });
});
