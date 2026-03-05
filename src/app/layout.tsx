import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Geist,
  Geist_Mono,
  Manrope,
  Bricolage_Grotesque,
  ADLaM_Display,
  Afacad,
  Adamina,
  Fira_Code,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

// Main site fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ledger demo fonts
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const adlamDisplay = ADLaM_Display({
  variable: "--font-adlam-display",
  subsets: ["latin"],
  weight: "400",
});

// Ritual demo fonts
const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

const adamina = Adamina({
  variable: "--font-adamina",
  subsets: ["latin"],
  weight: "400",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

// Circles demo fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Castro — Product Engineer",
  description:
    "Portfolio showcasing UI design and frontend engineering through interactive case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${bricolageGrotesque.variable} ${adlamDisplay.variable} ${afacad.variable} ${adamina.variable} ${firaCode.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="flex max-w-screen flex-col">
          <SiteHeader />
          <main className="flex-1 flex items-center justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
