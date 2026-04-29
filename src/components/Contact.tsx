"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Music, Video, Globe } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4">
              Get in Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Let's Create <br />
              <span className="text-gradient">Something Beautiful</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              For concert bookings, workshops, or private lessons, please feel free to reach out. I'm always open to new musical collaborations and opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary border border-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                  <p className="text-lg font-medium">bhatkaushik@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary border border-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                  <p className="text-lg font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary border border-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Location</p>
                  <p className="text-lg font-medium">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {[Music, Video, Globe].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-3xl border-white/5 gold-glow"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Name"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Email"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Subject</label>
                <input 
                  type="text" 
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Inquiry Subject"
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your Message"
                  suppressHydrationWarning
                ></textarea>
              </div>
              <button 
                className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all gold-glow"
                suppressHydrationWarning
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
