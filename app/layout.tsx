import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Caudex } from "next/font/google";
import { Prata } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const caudex = Caudex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caudex",
  weight: ["400", "700"],
});
const prata = Prata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-prata",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={caudex.variable + " " + prata.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
