// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import logo from "../assets/logof.png";

/**
 * Social media links configuration
 * - Each object represents a platform
 * - Replace `href` with your own profile links
 * - Add/remove items if you want more or fewer social platforms
 */
const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/vanshita-roopchandani-5943171b8/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/vanshita_roopchandani/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/vanshitaroop" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* --- Background brand glow effects --- */}
      {/* Teal glow overlay (top-right side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(22,224,196,0.18),transparent_70%)]" />
      {/* Violet glow overlay (bottom-left side) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(139,92,246,0.14),transparent_70%)]" />

      {/* --- Main Footer Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-10 md:py-12 lg:py-16 flex flex-col items-center text-center"
      >
        {/* --- 1. Vworks logo --- */}
        <img
          src={logo}
          alt="vworks"
          draggable="false"
          className="h-12 sm:h-14 md:h-16 w-auto select-none"
        />

        {/* --- 2. Hindi tagline --- */}
        <p className="mt-4 text-sm sm:text-base text-muted/90 tracking-wide">
          सोचो • बनाओ • बदलो
        </p>

        {/* --- 3. Main footer headline --- */}
        <h2 className="mt-7 max-w-xl lg:max-w-none px-2 text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug text-foreground whitespace-normal lg:whitespace-nowrap">
          Built with <span className="text-teal">curiosity.</span> Shipped
          with <span className="text-violet">purpose.</span>
        </h2>

        {/* --- 4. Social media links --- */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-muted
              shadow-[0_0_14px_-2px_rgba(139,92,246,0.18)] backdrop-blur-sm
              transition-[color,border-color,box-shadow] duration-200 ease-out
              hover:text-foreground hover:border-teal/30 hover:shadow-[0_0_22px_-2px_rgba(22,224,196,0.4)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* --- 5. Gradient accent (divider line removed, spacing unchanged) --- */}
        <div className="relative mt-10 h-px w-full max-w-xs">
          <span className="absolute left-1/2 top-1/2 h-[3px] w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal to-violet" />
        </div>

        {/* --- 6. Copyright --- */}
        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} Vanshita Roopchandani. All rights reserved.
        </p>

        {/* --- 7. Anonymous feedback link --- */}
        <Link
          to="/feedback"
          className="mt-3 text-xs text-muted/80 underline-offset-2 hover:text-teal hover:underline transition-colors"
        >
          Anonymous Feedback
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;
