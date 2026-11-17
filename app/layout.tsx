import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAMPAY — The Art of Everyday",
  description: "Thoughtfully selected essentials, delivered with style.",
  applicationName: "SAMPAY"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}