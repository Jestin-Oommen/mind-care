import Link from "next/link";
import {
  AudioWaveform,
  Github,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur">

      

        
      {/* Bottom Bar */}

      <div className="border-t border-border">

        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">

          <p>
            © {new Date().getFullYear()} Aura AI. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500"/> for mental wellbeing
          </p>

        </div>

      </div>

    </footer>
  );
}