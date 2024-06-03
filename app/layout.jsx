import "../index.scss";
import { ThemeProvider } from "@/containers/ThemeContext";

export const metadata = {
  title: "Beer finder",
  description:
    "searching through brewdog's catalogue of beers. Built with next js.",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
