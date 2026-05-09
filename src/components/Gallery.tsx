"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "/my-tabla-photos/2W4A4394.jpeg", span: "md:col-span-2 md:row-span-2", alt: "Tabla Performance Close-up" },
  { src: "/my-tabla-photos/IMG_7679.png", span: "", alt: "On Stage Performance" },
  { src: "/my-tabla-photos/IMG_8769.jpeg", span: "", alt: "Studio Session" },
  { src: "/my-tabla-photos/IMG_8770.jpeg", span: "", alt: "Classical Concert" },
  { src: "/my-tabla-photos/IMG_8771.jpeg", span: "md:row-span-2", alt: "Artistic Portrait" },
  { src: "/my-tabla-photos/IMG_8772.jpeg", span: "", alt: "Tabla Details" },
  { src: "/my-tabla-photos/IMG_8773.jpeg", span: "", alt: "Musical Moment" },
  { src: "/my-tabla-photos/a6a15c19-bbd1-497d-83c0-429cd50675fe.jpeg", span: "md:row-span-2", alt: "Professional Portrait" },
  { src: "/my-tabla-photos/b8be32dc-6fba-4246-8471-17c258808488.jpeg", span: "", alt: "Behind the Scenes" },
  { src: "/my-tabla-photos/2W4A4238.jpeg", span: "", alt: "Grand Stage" },
  { src: "/my-tabla-photos/2W4A4260.jpeg", span: "", alt: "Solo Recital" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4"
            >
              Visual Journey
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold leading-tight"
            >
              Capturing <span className="text-gradient">The Rhythm</span>
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-sm mb-2 text-lg leading-relaxed"
          >
            A curated collection of moments from prestigious stages, intimate baithaks, and collaborative explorations.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: (index % 4) * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className={`relative overflow-hidden rounded-3xl gold-border group cursor-pointer gold-glow shadow-2xl ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                 <p className="text-primary font-serif font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
                 <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
