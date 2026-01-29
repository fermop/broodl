import Button from "@/components/Button";
import { Fugaz_One } from "next/font/google";
import Link from "next/link";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-xs sm:text-base">
      <h2 className="text-4xl font-bold text-indigo-600 text-center"><span className={`text-6xl ${fugaz.className}`}>404</span> <br />Page not found</h2>
      <p>Ups, it looks like you're lost in space.</p>
      <Link href="/" className="mt-8">
        <Button dark text="Go back to home page" />
      </Link>
    </div>
  );
}