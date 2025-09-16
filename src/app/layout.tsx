import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Closer to Nature — Closer to Yourself",
  description: "Welcome to a world of wild California desert with Capsules®, where you will desert with Capsules®, where you will discover exquisite nature observing itdiscover exquisite nature observing it from capsule houses, nestled in thefrom capsule houses, nestled in the one of the most breathtakingone of the most breathtaking destination on the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hostGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
