import type { Metadata } from "next";
import { Fugaz_One, Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const opensans = Open_Sans({ subsets: ["latin"]});
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "Broodl",
  description: "Track your daily mood, every day of the year!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>Broodl</h1>
      </Link>

      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`text-indigo-500 ${fugaz.className}`}>Created with 💛</p>
    </footer>
  )
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`w-full max-w-[62.5rem] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${opensans.className} antialiased`}
          >
          {header}

          {children}

          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
