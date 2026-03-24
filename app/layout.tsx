import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const francy = localFont({
  src: [
    {
      path: "../public/fonts/Francy/Francy.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-francy",
});

const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Fonts/Gilroy-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "Boundless Builders | Showcase Your Work",
  description:
    "The premier platform for builders on Boundless. Discover projects, connect with builders, and build the future of decentralization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${francy.variable} ${gilroy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
