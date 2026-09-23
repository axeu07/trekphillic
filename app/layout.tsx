import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trekphillic.example"),
  title: {
    default: "TrekPhillic | Travel Deeper, Live Wilder",
    template: "%s | TrekPhillic",
  },
  description:
    "Trek and tour enquiries for Himalayan adventures, seasonal escapes, and travel vehicles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <FirebaseAnalytics />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

