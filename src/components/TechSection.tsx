"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Globe, Cpu, Layout, Terminal, Zap } from "lucide-react";

const skills = [
  { name: "Frontend Development", icon: Layout, desc: "Building responsive, modern user interfaces with Next.js and React." },
  { name: "Web Architecture", icon: Globe, desc: "Designing scalable and performant web applications." },
  { name: "Clean Code", icon: Code2, desc: "Writing maintainable, well-documented, and efficient code." },
  { name: "System Design", icon: Cpu, desc: "Understanding the full stack to build better frontend experiences." },
  { name: "Performance", icon: Zap, desc: "Optimizing web apps for maximum speed and user satisfaction." },
  { name: "Modern Tooling", icon: Terminal, desc: "Proficient with Git, Docker, and modern CI/CD pipelines." },
];

export default function TechSection() {
  return (
    <section id="tech" className="py-24 px-6 bg-secondary/10 relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4"
          >
            Digital Craftsmanship
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6"
          >
            Engineering <span className="text-gradient">With Soul</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
          >
            The same precision, rhythm, and discipline required for Tabla are the foundations of my engineering practice. I build digital experiences that are as harmonious as a well-composed Raga.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-background/40 border border-white/5 hover:border-primary/30 transition-all group gold-glow hover:bg-secondary/40"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                <skill.icon className="text-primary" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {skill.name}
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-secondary/60 via-background/80 to-primary/5 border border-white/5 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <h4 className="text-3xl font-serif font-bold mb-4">Bridging Music & Technology</h4>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg leading-relaxed">
              Whether it's a complex rhythmic cycle or a high-traffic web application, I approach every challenge with the same commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#contact" className="px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-full gold-glow hover:scale-105 transition-all duration-300">
                Start a Conversation
              </a>
              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground italic">
                <span className="w-8 h-[1px] bg-primary/30" />
                Frontend Engineer @ BIT
                <span className="w-8 h-[1px] bg-primary/30" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
