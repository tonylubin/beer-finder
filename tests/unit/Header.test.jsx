import { beforeEach, describe, expect, test } from "vitest";
import Header from "../../components/Header/Header";
import { render, screen } from "@/utils/test-utils";
import userEvent from "@testing-library/user-event";


describe("Color theme", () => {

  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Header />);
  });

  test("should display website heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Beer Finder");
  });

  test("should display dark logo", () => {
    const logo = screen.getByTestId("darkLogo");
    expect(logo).toBeInTheDocument();
  });

  test("should display white logo on click", async () => {
    const btn = screen.getByRole("button", { name: "light theme" });
    await user.click(btn);
    const logo = await screen.findByTestId("lightLogo");
    expect(logo).toBeInTheDocument();
  });

  test("should display sun icon when light theme", async () => {
    const icon = await screen.findByLabelText("Change to dark theme");
    expect(icon).toBeInTheDocument();
  });

  test("should display moon icon on click when light theme", async () => {
    const btn = screen.getByRole("button", {name: "light theme"});
    await user.click(btn);
    const icon = await screen.findByLabelText("Change to light theme");
    expect(icon).toBeInTheDocument();
  });

});