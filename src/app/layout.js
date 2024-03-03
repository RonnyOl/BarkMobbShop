
import { Inter } from "next/font/google";
import { Mukta } from "next/font/google";
import { Permanent_Marker } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const mukta = Mukta({subsets: ["latin"], weight: "400", variable: "--font-lato"})

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const permanent_marker = Permanent_Marker({subsets: ["latin"], weight: "400", variable: "--font-slacksideOne"})

export const metadata = {
  title: "BarkMobb",
  description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="es">
<body className={` ${mukta.variable} ${inter.variable} ${permanent_marker.variable}` }>
        <NavBar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
