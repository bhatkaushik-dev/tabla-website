"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-center bg-background overflow-hidden pt-20 md:pt-0">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Image Section - Floating Framed Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-[320px] md:max-w-[420px] aspect-[4/5] order-1 md:order-2 flex-shrink-0"
        >
          {/* Main Portrait with Rounded Frame and Interactive Tilt */}
          <motion.div 
            whileHover={{ 
              rotateY: 8, 
              rotateX: -5,
              scale: 1.02,
              transition: { duration: 0.4 }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden gold-border shadow-2xl p-1 group"
          >
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-[inherit] blur-2xl animate-pulse -z-10 group-hover:bg-primary/40 transition-colors" />
            
            <div className="relative w-full h-full rounded-[inherit] overflow-hidden bg-black">
              <Image
               src="/my-tabla-photos/2W4A4238.jpeg"
                alt="Kaushik Bhat with Tabla"
                fill
                className="object-cover object-[center_25%] scale-[1.25] transition-transform duration-700 group-hover:scale-[1.3]"
                priority
              />
              {/* Subtle Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </motion.div>
          
          {/* Decorative Floating Elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-10 -right-10 w-24 h-24 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 order-2 md:order-1 text-center md:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-medium tracking-[0.4em] uppercase text-xs md:text-sm mb-6 block">
              B-High Graded Artist • AIR
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1] tracking-tight">
              Kaushik <br />
              <span className="text-gradient">Bhat</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed mx-auto md:mx-0">
              A distinguished Tabla Artist dedicated to the traditional 
              percussive excellence of Indian Classical Music. 
              Blending legacy with a modern artistic vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
              <a href="#gallery" className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-full gold-glow hover:scale-105 transition-all text-sm">
                View Performances
              </a>
              <a href="#bio" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-sm text-foreground font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all text-sm">
                Biography
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
      </motion.div>
    </section>
  );
}
