// src/sections/Projects.jsx

import React from "react"; 
import { motion, useScroll, AnimatePresence } from "framer-motion"; 
// motion: for animating elements
// useScroll: to track scroll position
// AnimatePresence: to animate components when mounting/unmounting

// Importing project/achievement banner images
import bannerSidHealthcare from "../assets/banner1.png";
import bannerAwsCertification from "../assets/banner2.png";
import bannerXillion from "../assets/banner3.png";

const MH3 = motion.h3; 
// Shortcut for <motion.h3> for easier typing

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
    // Checks if the screen width is <= 639px (mobile breakpoint)
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query); // Media query list
    const handler = (e) => setIsMobile(e.matches); // Update state when query changes
    mql.addEventListener?.("change", handler) || mql.addListener(handler); 
    // Add correct event listener (modern OR fallback)

    setIsMobile(mql.matches); // Initialize with current screen size
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler); 
    // Cleanup event listener
  }, [query]);

  return isMobile; 
};

export default function Projects() {
  const isMobile = useIsMobile(); 
  // Detect if the user is on a mobile screen

  // 🔹 List of project/achievement objects
  const projects = React.useMemo(
    () => [
      {
        title: "SID Healthcare",
        link: "https://sidhealthcare.com/",
        image: bannerSidHealthcare,
        ctaLabel: "View Project",
      },
      {
        title: "Xillion",
        link: "https://xillion.in/",
        image: bannerXillion,
        ctaLabel: "View Project",
      },
      {
        title: "AWS Certification",
        link: "https://www.credly.com/badges/3a3cb350-d49b-4d8b-be6e-03d0c57863ba/public_url",
        image: bannerAwsCertification,
        ctaLabel: "View Certificate",
      },
    ],
    []
  );

  const sceneRef = React.useRef(null); 
  // Reference to the whole projects section (used for scroll tracking)

  const { scrollYProgress } = useScroll({
    target: sceneRef, 
    offset: ["start start", "end end"], 
    // Scroll progress is 0 when section top hits viewport top and 1 at the end
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length); 
  // Array of thresholds to switch between projects as user scrolls
  const [activeIndex, setActiveIndex] = React.useState(0); 
  // Keeps track of which project is currently active

  // 🔹 Update activeIndex as user scrolls
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t); 
      // Find the first threshold that is greater than or equal to scroll progress
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx); 
      // If not found, show the last project
    });
    return () => unsubscribe(); 
    // Cleanup scroll listener
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex]; 
  // Currently displayed project

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-foreground bg-background"
      style={{
        height: `${100 * projects.length}dvh`,
        // Section height = 100vh per project (makes scroll-based transitions work)
      }}
    >
      {/* Subtle brand glow instead of a solid per-project background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(22,224,196,0.14), transparent 70%)",
        }}
      />

      {/* Sticky container keeps content fixed while scrolling */}
      <div className="sticky top-0 h-dvh flex flex-col items-center justify-center">

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold z-10 text-center px-14 mt-8">
          Projects &amp; Achievements
        </h2>

        {/* Main Project Display Area */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
              }`}
              style={
                isMobile
                  ? { width: "calc(100% - 28px)" } // ~14px side margins on mobile
                  : { width: "85%", maxWidth: "1200px" }
              }
            >
              {/* Animate project title when switching */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-foreground/95 sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%] sm:mb-0 font-bangers italic font-semibold ${
                      isMobile ? "mb-3" : ""
                    }`}
                    style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Project Image Wrapper — sized to the banner's own aspect ratio so it is never cropped or stretched */}
              <div
                className={`relative w-full overflow-hidden bg-background/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] aspect-[2053/766] ${
                  isMobile ? "mb-5 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                }`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                {/* Subtle gradient overlay for better readability */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>

              {/* On mobile the button lives right below its banner (in the same
                  cross-fading block) so spacing stays tight and consistent
                  instead of being pinned a fixed distance from the screen bottom. */}
              {isMobile && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit mx-auto px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-teal to-violet text-background hover:opacity-90 transition-all"
                  aria-label={`${project.ctaLabel || "View Project"}: ${project.title}`}
                >
                  {project.ctaLabel || "View Project"}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* View Project Button — desktop only; mobile renders its own button per-slide above */}
        {!isMobile && (
          <div className="absolute bottom-10">
            <a
              href={activeProject?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-teal to-violet text-background hover:opacity-90 transition-all"
              aria-label={`${activeProject?.ctaLabel || "View Project"}: ${activeProject?.title}`}
            >
              {activeProject?.ctaLabel || "View Project"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
