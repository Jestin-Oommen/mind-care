"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  MessageCircle,
  AudioWaveform,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton"; // ✅ Import Auth Button

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About Aura" },
  ];

  return (
    <div className="w-full fixed top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <header className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <AudioWaveform className="h-7 w-7 text-primary animate-pulse" />

            <div className="flex flex-col">
              <span className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Aura
              </span>

              <span className="text-xs text-muted-foreground">
                AI Therapy Companion
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition relative group"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Start Chat Button (Desktop) */}
            <Button asChild className="hidden md:flex gap-2">
              <Link href="/chat">
                <MessageCircle className="w-4 h-4" />
                Start Chat
              </Link>
            </Button>

            {/* 🔐 Auth Button (Desktop) */}
            <div className="hidden md:block">
              <AuthButton />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="flex flex-col space-y-1 py-4">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Start Chat */}
              <Button asChild className="mt-2 mx-4 gap-2">
                <Link href="/chat">
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </Link>
              </Button>

              {/* 🔐 Auth Button (Mobile) */}
              <div className="px-4 pt-2">
                <AuthButton />
              </div>

            </nav>
          </div>
        )}
      </header>
    </div>
  );
}