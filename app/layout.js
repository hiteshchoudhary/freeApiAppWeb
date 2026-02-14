import "./globals.css";
import { Outfit, Syne, Fira_Code } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "FreeAPI - Open Source API Hub | Chaicode",
  description:
    "Master API integration with free, open-source APIs. Build real portfolio projects with authentication, e-commerce, social media, and 50+ endpoints.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${firaCode.variable}`}
    >
      <body className="font-body bg-[#0B0F1A] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
