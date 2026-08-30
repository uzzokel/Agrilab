import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/agribarlab/Navbar";
import { theme } from "@/app/components/Styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriLab M&E Platform",
  description: "Decentralized monitoring, evaluation, and impact tracking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { neutralLight, neutralDark } = theme;

  return (
    <html lang="en">
      <body 
        className={inter.className} 
        style={{ backgroundColor: neutralDark, color: neutralLight }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}