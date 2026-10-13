import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaCalendarDays,
  FaLocationDot,
  FaUserGroup,
  FaCamera,
  FaBuildingColumns,
  FaRocket,
} from "react-icons/fa6";
import workshopPhoto from "../assets/startbuildgrow.png";

// Swap this import to replace the event photo — container size, border,
// and glow stay unchanged regardless of the source image.
const EVENT_IMAGE_SRC = workshopPhoto;

const metadata = [
  { Icon: FaCalendarDays, label: "Event", value: "Google for Startups Workshop" },
  { Icon: FaLocationDot, label: "Location", value: "IIM Ahmedabad, India" },
  { Icon: FaUserGroup, label: "Experience", value: "Startup Networking" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const reducedContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

function EventPhoto({ reducedMotion }) {
  const [status, setStatus] = useState("loading");

  return (
    <a
      href="https://www.linkedin.com/feed/update/urn:li:activity:7266394267630116865/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View the Google for Startups workshop post on LinkedIn"
      className="group relative mx-auto block w-full max-w-md lg:max-w-none"
    >
      {/* ambient glow behind the image */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-teal/25 via-violet-light/20 to-violet/25 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
      />

      {/* thin animated gradient border */}
      <div
        className={`relative rounded-3xl p-[1.5px] bg-gradient-to-r from-teal via-violet-light to-violet ${
          reducedMotion ? "" : "bg-[length:200%_200%] animate-gradient"
        }`}
      >
        <div className="relative w-full aspect-[1323/1189] rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-surface">
          {/* faint grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {status !== "error" && (
            <img
              src={EVENT_IMAGE_SRC}
              alt="Vanshita Roopchandani representing Prepseed at the Google for Startups workshop, IIM Ahmedabad"
              loading="lazy"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                status === "loaded" ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {status !== "loaded" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-teal backdrop-blur-sm">
                <FaCamera className="text-2xl" />
              </span>
              <p className="text-base sm:text-lg font-semibold text-foreground">
                Workshop Photo
              </p>
              <p className="text-sm text-muted max-w-[220px]">
                My Google for Startups experience
              </p>
              <p className="text-xs text-muted/70">Event photo coming soon</p>
            </div>
          )}

          {/* floating labels */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-background/60 px-3 py-1.5 backdrop-blur-md">
            <FaBuildingColumns className="text-teal text-xs" />
            <span className="text-[11px] sm:text-xs font-medium text-foreground/90">
              IIM Ahmedabad
            </span>
          </div>
          <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-background/60 px-3 py-1.5 backdrop-blur-md">
            <FaRocket className="text-violet-light text-xs" />
            <span className="text-[11px] sm:text-xs font-medium text-foreground/90">
              Startup Ecosystem
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function FeaturedMilestone() {
  const prefersReducedMotion = useReducedMotion();
  const cVariants = prefersReducedMotion ? reducedContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <section
      id="featured-milestone"
      aria-label="Featured milestone: Google for Startups workshop"
      className="relative w-full overflow-hidden bg-background text-foreground py-10 md:py-12 lg:py-16"
    >
      {/* ambient background accents, consistent with other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[380px] h-[380px] rounded-full bg-gradient-to-r from-violet to-teal opacity-10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[340px] h-[340px] rounded-full bg-gradient-to-r from-teal to-violet opacity-10 blur-[140px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12"
        variants={cVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          {/* decorative translucent "G" */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-16 -left-4 sm:-left-8 -z-10 text-[200px] sm:text-[260px] lg:text-[300px] font-black leading-none bg-gradient-to-br from-teal/5 via-violet/5 to-transparent bg-clip-text text-transparent"
          >
            G
          </span>

          {/* radial light behind heading */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-[420px] h-[420px] -z-10 rounded-full bg-gradient-to-r from-teal/20 to-violet/20 blur-[120px]"
          />

          {/* Left column — achievement details */}
          <div className="relative text-center lg:text-left">
            <motion.div
              variants={iVariants}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-gradient-to-r from-teal/15 via-violet-light/10 to-violet/15 shadow-[0_0_25px_-5px_rgba(139,92,246,0.4)] backdrop-blur-sm"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-teal to-violet-light">
                ✦ Beyond the Code
              </span>
            </motion.div>

            <motion.h2
              variants={iVariants}
              className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-tight text-foreground"
            >
              Representing Prepseed at{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal via-sky-400 to-violet">
                Google for Startups
              </span>
            </motion.h2>

            <motion.p
              variants={iVariants}
              className="mt-5 text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              An opportunity to represent Prepseed at a Google for Startups
              workshop at IIM Ahmedabad, connect with founders, attend
              insightful sessions, and gain a closer look at the startup
              ecosystem.
            </motion.p>

            <motion.div
              variants={iVariants}
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-stretch"
            >
              {metadata.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex h-full items-center gap-2.5 rounded-xl border border-border bg-surface/60 px-3.5 py-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal/20 to-violet/20 text-teal">
                    <Icon className="text-sm" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[11px] uppercase tracking-wide text-muted">
                      {label}
                    </span>
                    <span className="block text-sm font-medium text-foreground">
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — event photo */}
          <motion.div variants={iVariants}>
            <EventPhoto reducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
