"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/my-tabla-photos/2W4A4238.jpeg"
          alt="Kaushik Bhat performing Tabla"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
            B-High Graded Artist - All India Radio
          </h2>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight">
            Kaushik <br />
            <span className="text-gradient">Bhat</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A distinguished Tabla Artist & Frontend Engineer blending 
            traditional percussive excellence with modern digital innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#gallery" className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-full gold-glow hover:scale-105 transition-all">
              View Performances
            </a>
            <a href="#bio" className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm text-foreground font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
              Read Biography
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
      </motion.div>
    </section>
  );
}
