"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Bio() {
  return (
    <section id="bio" className="py-32 px-6 bg-secondary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="sticky top-24"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden gold-border gold-glow shadow-2xl">
              <Image
                src="/my-tabla-photos/2W4A4260.jpeg"
                alt="Kaushik Bhat"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-background/60 border border-white/5 backdrop-blur-md gold-glow"
              >
                <h4 className="text-primary font-bold text-3xl mb-1">12+</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Years with Pt Gurumurthy Vaidya</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-background/60 border border-white/5 backdrop-blur-md gold-glow"
              >
                <h4 className="text-primary font-bold text-3xl mb-1">B-High</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">AIR Graded Artist</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-primary font-medium tracking-[0.4em] uppercase text-xs mb-4">
              Legacy & Lineage
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-5xl md:text-6xl font-serif font-bold mb-10 leading-tight">
              A Journey of <br />
              <span className="text-gradient">Dedication</span>
            </motion.h3>
            
            <div className="space-y-12 text-muted-foreground leading-relaxed text-lg">
              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-foreground font-bold font-serif text-2xl flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-primary/40" />
                  Musical Roots
                </h4>
                <p>
                  Kaushik Bhat's journey into the world of Tabla began at the age of 10. His initial foundation was laid by his father, <strong>Shri Ganesh Bhat</strong>, an International Artist of fame, who taught him that every stroke is a sculpture in time.
                </p>
                <p>
                  Today, after 12 years of immersive study, he continues to evolve under the guidance of the legendary <strong>Pt Gurumurthy Vaidya</strong>.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-foreground font-bold font-serif text-2xl flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-primary/40" />
                  Collaborations
                </h4>
                <p className="text-base">
                  As a B-high Graded artist from All India Radio, Kaushik has shared the stage with masters of the craft:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm font-medium">
                  {[
                    "Pt Parameshwar Hegde", "Ustaad Shafique Khan", 
                    "Dr Ravindra Katoti", "Vid Poornima Bhat Kulkarni",
                    "Padmashri Kanyakumari Avasarala", "Pt Dhananjay Hegde",
                    "Pt Himanshu Nanda", "Shri Koushik Aithal"
                  ].map((artist) => (
                    <div key={artist} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {artist}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-foreground font-bold font-serif text-2xl flex items-center gap-4">
                  <span className="w-10 h-[1px] bg-primary/40" />
                  Versatility
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Kathak", "Devotional", "Abhangs", "Bhajans", "Movie Scores"].map((tag) => (
                    <span key={tag} className="px-5 py-2 bg-primary/5 border border-primary/20 rounded-xl text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/10 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-10 border-t border-white/5">
                <h4 className="text-foreground font-bold font-serif text-2xl mb-6">Academic Excellence</h4>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10">
                  <p className="text-lg italic text-foreground/90 mb-4 font-serif">
                    "Precision in rhythm, precision in logic."
                  </p>
                  <p className="text-base">
                    A <strong>BTech graduate from BIT</strong>, Kaushik seamlessly transitions between the complex rhythms of Tabla and the architectural logic of <strong>Frontend Engineering</strong>.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
