import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Varad Kulkarni | Engineer, Builder, Researcher",
  description:
    "Portfolio of Varad Kulkarni, a software engineer working across full-stack systems, DevOps, networking and GenAI research.",
  keywords: ["Varad Kulkarni", "Software Engineer", "GenAI", "DevOps", "Computer Networks", "Portfolio"],
  openGraph: {
    title: "Varad Kulkarni | Engineer, Builder, Researcher",
    description: "Software engineer building useful systems and researching what comes next.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
