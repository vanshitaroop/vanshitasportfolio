// src/sections/Home.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import avatar from "../assets/avator.webp";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import ParticleBackground from "../components/ParticlesBackground";

const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/vanshita-roopchandani-5943171b8/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/vanshita_roopchandani/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/vanshitaroop" },
];


const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 6px rgba(22,224,196,0.6)) drop-shadow(0 0 12px rgba(139,92,246,0.5))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const headlineVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedHeadlineVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => [
      "Full Stack Developer",
      "AWS Solutions Architect",
      "Software Developer",
      "Technical Problem Solver",
    ],
    []
  );
  const longestRole = "Technical Problem Solver";
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // rotate headline every ~3s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-dvh w-full relative overflow-hidden bg-background"
    >
      <ParticleBackground />

      {/* gradient blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-violet to-teal
          opacity-20 sm:opacity-15 md:opacity-10
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0
          w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-teal to-violet
          opacity-25 sm:opacity-20
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* headline reveal */}
            <motion.div
              className="relative mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              aria-live="polite"
              aria-atomic="true"
            >
              {/* invisible sizer reserves space for the longest headline to prevent layout shift */}
              <span aria-hidden="true" className="invisible block">
                {longestRole}
              </span>
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    variants={prefersReducedMotion ? reducedHeadlineVariants : headlineVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="bg-gradient-to-r from-teal to-violet bg-clip-text text-transparent"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* name */}
            <motion.h1
              className="font-bold drop-shadow-lg leading-[1.05]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="block text-teal text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Hello, I&apos;m
              </span>
              <span className="block mt-1 sm:mt-2 text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Vanshita Roopchandani
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              className="mt-4 text-sm sm:text-base md:text-lg leading-[1.6] text-muted max-w-[500px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              From building full-stack applications to designing AWS
              infrastructure, I enjoy figuring out difficult problems and
              finding practical solutions that work for both users and
              businesses.
            </motion.p>

            {/* buttons */}
            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base sm:text-lg font-medium text-background
                bg-gradient-to-r from-teal to-violet
                shadow-lg transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/30"
              >
                View My Work
              </a>
              {/* Resume not uploaded yet — disabled placeholder.
                  To re-enable: swap back to an <a href="/Resume.pdf" download>
                  with the original enabled styling/label once the file exists. */}
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Resume coming soon"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base sm:text-lg font-medium text-muted bg-foreground/40 border border-border shadow-lg opacity-60 cursor-not-allowed select-none"
              >
                Resume Coming Soon
              </button>
            </motion.div>

            {/* socials */}
            <motion.div
              className="mt-6 flex gap-2 text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center justify-center w-11 h-11 rounded-full text-muted
                  transition-colors duration-200 hover:text-teal
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #16E0C4, #8B5CF6, #C084FC, #16E0C4)",
            }}
          />
          <motion.img
            src={avatar}
            alt="Vanshita Roopchandani avatar"
            fetchPriority="high"
            decoding="async"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{ right: "-30px", width: "min(45vw, 780px)", maxHeight: "90vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
