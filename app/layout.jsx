import ProgressBarProvider from "@/containers/ProgressBarProvider";
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
        <body>
          <ProgressBarProvider>
            {children}
          </ProgressBarProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
