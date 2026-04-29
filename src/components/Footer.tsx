import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-secondary/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <Link href="/" className="text-xl font-serif font-bold text-gradient tracking-tight">
            KAUSHIK BHAT
          </Link>
          <p className="text-sm text-muted-foreground mt-2 uppercase tracking-widest">
            Tabla Artist | Percussionist
          </p>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground uppercase tracking-widest font-medium">
          <Link href="#bio" className="hover:text-primary transition-colors">Bio</Link>
          <Link href="#videos" className="hover:text-primary transition-colors">Videos</Link>
          <Link href="#gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Kaushik Bhat. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
