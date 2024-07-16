import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../Components/NavBar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Self Project App Manager",
  description: "Self Project App Manager - Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ marginLeft: '80px', marginRight: '80px' }}>
        <header>
          <NavBar />
        </header>
        <div >
          {children}
        </div>
      </body>
    </html>
  );
}
