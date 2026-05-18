import "./globals.css";
import { Manrope, Anton, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
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
      className={`${manrope.variable} ${anton.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
