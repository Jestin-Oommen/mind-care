"use client";

import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      
      {children}
      
    </SessionProvider>
  );
}