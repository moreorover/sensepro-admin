import { ScreenSize } from "@/components/screensize";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SensePro",
  description: "CCTV Security",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        {modal}
        <Toaster />
        {process.env.NODE_ENV === "development" && <ScreenSize />}
      </body>
    </html>
  );
}
