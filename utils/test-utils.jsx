import { render } from "@testing-library/react";
import { ThemeProvider } from "@/containers/ThemeContext";


const customRender = (ui, options) =>
  render(ui, { wrapper: ThemeProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render }