"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

const videos = [
  {
    title: "Tabla Solo Recital - Teental",
    duration: "12:45",
    thumbnail: "/my-tabla-photos/2W4A4238.jpeg",
    link: "#"
  },
  {
    title: "Kathak Accompaniment Highlights",
    duration: "08:20",
    thumbnail: "/my-tabla-photos/IMG_7679.png",
    link: "#"
  },
  {
    title: "Vocal Accompaniment - Raag Yaman",
    duration: "15:10",
    thumbnail: "/my-tabla-photos/2W4A4394.jpeg",
    link: "#"
  }
];

export default function Videos() {
  return (
    <section id="videos" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Artistry in Motion
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold leading-tight"
          >
            Watch & <span className="text-gradient">Experience</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 gold-border group-hover:scale-[1.02] transition-all duration-500 gold-glow">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground transform group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {video.duration}
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold group-hover:text-primary transition-colors duration-300 px-1">{video.title}</h4>
              <p className="text-[10px] text-primary/60 font-bold uppercase tracking-[0.2em] mt-2 px-1">Performance • Classical</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-primary/30 transition-all duration-300">
             <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 uppercase font-bold tracking-[0.2em] text-sm group-hover:text-primary transition-colors">
               Explore Full Catalog
             </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
