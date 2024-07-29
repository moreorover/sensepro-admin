import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sense Pro",
  description: "Sense Pro Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
