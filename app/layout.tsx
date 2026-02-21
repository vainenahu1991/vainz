import "./globals.css";
import NavBar from "./components/NavBar";
import { CartProvider } from "./components/CartProvider";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="site-body">
        <CartProvider>
          <NavBar />
          <main className="main-wrapper">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}