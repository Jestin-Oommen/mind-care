import { ReactNode } from "react";
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          
          {children}
          
        </Providers>
      </body>
    </html>
  );
}