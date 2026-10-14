// Importing React for building UI components
import React from "react";
// Importing motion components and scroll hooks from Framer Motion for animations
import { motion, useScroll, useTransform } from "framer-motion";

// Array of experience objects containing job details
// Edit this array to update roles, durations, descriptions, etc.
const experiences = [
  {
    role: "Web Developer",
    company: "OCC EduSoft",
    about: "Maharashtra, India",
    duration: "March 2022 – July 2022",
    location: "Remote",
    description:
      "Built a US client's Friends City Connector website using PHP, HTML, CSS, and JavaScript, gaining hands-on experience in web development.",
  },
  {
    role: "Web Developer",
    company: "Outlead Solutions",
    about: "Creative marketing agency",
    duration: "February 2023 – April 2023",
    location: "Ahmedabad, India — Onsite",
    description:
      "Built responsive, user-friendly client websites using React, collaborating with the team to deliver tailored web experiences.",
  },
  {
    role: "Tech Lead & Full Stack Developer",
    company: "Prepseed",
    about: "AI startup",
    duration: "February 2023 – Present",
    location: "Ahmedabad, India",
    description:
      "Building full-stack applications, AI-powered recommendations, and LMS/ERP solutions. Led development of the Student WhatsApp platform for Keystone and contributed to AWS-based infrastructure.",
  },
  {
    role: "Software Developer",
    company: "Paktolus",
    about: "US-based MNC",
    duration: "October 2025 – Present",
    website: "https://www.paktolus.com/",
    logo: "https://www.paktolus.com/wp-content/uploads/2023/11/white-newtheme-logo.svg",
    description:
      "Contributing to SafetyAtlas, the National Safety Council's platform connecting safety training, resources, services, and credentials.",
  },
];

// Small, dedicated company logo — fails silently (no broken-image icon) if the
// external asset is ever unavailable.
function CompanyLogo({ src, alt, href }) {
  const [failed, setFailed] = React.useState(false);
  if (!src || failed) return null;

  const img = (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-5 w-auto shrink-0 opacity-90"
    />
  );

  if (!href) return img;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
      {img}
    </a>
  );
}

// Reusable component to render each desktop experience item with scroll-scrubbed animations
function ExperienceItem({ exp, idx, total, start, end, scrollYProgress }) {
  // Animates the size of the marker (dot) as user scrolls
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the marker
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // Animates the opacity of the card
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // Checks if card should be displayed above or below the timeline line
  const isAbove = idx % 2 === 0;
  // Animates vertical movement of cards
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);

  const companyLabel = exp.about ? `${exp.company} (${exp.about})` : exp.company;
  const metaLine = [companyLabel, exp.duration].join(" | ") + (exp.location ? ` · ${exp.location}` : "");

  // Edge columns (first/last) anchor the card inward instead of centering it
  // under the dot, so it can never overflow past the viewport's outer edge.
  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  const hPos = isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
      {/* Marker dot on the timeline */}
      <motion.div
        className="z-10 w-7 h-7 rounded-full bg-teal shadow-[0_0_0_8px_rgba(22,224,196,0.15)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Small vertical line above or below the marker */}
      <motion.div
        className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-teal/40`}
        style={{ height: 40, opacity: cardOpacity }}
      />
      {/* Experience card with role, company, duration, description */}
      <motion.article
        className={`absolute ${isAbove ? "bottom-10" : "top-10"} ${hPos} bg-surface/80 backdrop-blur border border-border rounded-xl p-4 lg:p-5 w-[280px] md:w-[300px] lg:w-[330px] shadow-lg`}
        style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base lg:text-lg font-semibold text-foreground">{exp.role}</h3>
          <CompanyLogo src={exp.logo} href={exp.website} alt={`${exp.company} logo`} />
        </div>
        <p className="text-xs text-muted mb-2">{metaLine}</p>
        <p className="text-xs text-muted break-words leading-snug">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// Mobile timeline item: same scroll-scrubbed reveal as desktop (marker +
// card fade in as scrollYProgress sweeps through [start, end]). The list
// itself is moved by a single transform driven by scrollYProgress (see
// Experience's `listY`) rather than native overflow scrolling, so there's
// only one thing driving motion during the pin — no fight over the scroll
// gesture, and the last card's reveal finishes exactly when the pin releases.
function MobileExperienceItem({ exp, idx, start, end, scrollYProgress }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  const companyLabel = exp.about ? `${exp.company} (${exp.about})` : exp.company;
  const metaLine = [companyLabel, exp.duration].join(" | ") + (exp.location ? ` · ${exp.location}` : "");

  return (
    <div className="relative flex items-start">
      {/* Marker dot on mobile timeline */}
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-teal shadow-[0_0_0_8px_rgba(22,224,196,0.15)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Experience card (mobile version) */}
      <motion.article
        className="bg-surface/80 backdrop-blur border border-border rounded-xl p-4 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold break-words text-foreground">{exp.role}</h3>
          <CompanyLogo src={exp.logo} href={exp.website} alt={`${exp.company} logo`} />
        </div>
        <p className="text-xs text-muted mb-1.5 break-words">{metaLine}</p>
        <p className="text-xs text-muted break-words leading-snug">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// Main Experience component
const Experience = () => {
  const sceneRef = React.useRef(null); // Ref for the scrolling section
  const [isMobile, setIsMobile] = React.useState(false); // State to track if device is mobile

  // Detect window size and set isMobile state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Mobile scroll-scrubbed list measurement ---
  // The mobile card list is taller than the pinned viewport, so instead of
  // native overflow-y-auto (which fights the pinned-section scroll gesture —
  // the bug this replaced), the list's vertical position is driven directly
  // by scrollYProgress via a transform. That means we need to know how far
  // it has to travel: content height minus visible viewport height.
  const mobileListRef = React.useRef(null);
  const mobileViewportRef = React.useRef(null);
  const [mobileMaxScroll, setMobileMaxScroll] = React.useState(0);
  const [mobileSceneHeightPx, setMobileSceneHeightPx] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!isMobile) return undefined;

    const measure = () => {
      const viewportH = mobileViewportRef.current?.clientHeight || window.innerHeight;
      const contentH = mobileListRef.current?.scrollHeight || 0;
      const scrollable = Math.max(contentH - viewportH, 0);
      setMobileMaxScroll(scrollable);
      // scrollYProgress is always normalized 0→1 regardless of the scene's
      // real height, so stretching the scene beyond the bare minimum needed
      // to reveal all content just paces the scrub out more comfortably —
      // it can't introduce a "dead zone" since the list's translateY and
      // each card's reveal both map off the same 0→1 progress.
      const comfortablePace = window.innerHeight * experiences.length * 1.3;
      setMobileSceneHeightPx(Math.max(comfortablePace, window.innerHeight + scrollable));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (mobileListRef.current) ro.observe(mobileListRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  // Dynamic scene height for the desktop scroll-scrubbed scene
  const SCENE_HEIGHT_DVH = 100 * experiences.length * 1.2;

  // Get scroll progress for animations
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  // Calculate thresholds for each experience card's animation start/end
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  // Animate timeline line width (desktop) / height (mobile)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  // Mobile card list slides up through the pinned viewport as scroll progresses
  const mobileListY = useTransform(scrollYProgress, [0, 1], [0, -mobileMaxScroll]);

  // Mobile: same pinned/scroll-scrubbed scene as desktop, but the list's
  // motion comes entirely from `mobileListY` (a transform), not native
  // overflow scrolling — one source of truth for the scroll gesture, so the
  // pin only releases once the last card has fully revealed.
  if (isMobile) {
    return (
      <section id="experience" className="relative bg-background text-foreground">
        <div
          ref={sceneRef}
          style={{ height: mobileSceneHeightPx ? `${mobileSceneHeightPx}px` : `${100 * experiences.length * 1.5}dvh` }}
          className="relative"
        >
          <div className="sticky top-0 h-dvh flex flex-col relative overflow-hidden">
            {/* Ambient background accents, consistent with other sections */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[120px] animate-pulse" />
              <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px] animate-pulse delay-300" />
            </div>

            {/* Section Title */}
            <div className="relative z-10 shrink-0 px-6 pt-8">
              <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience</h2>
            </div>

            {/* Timeline viewport — fixed height, clips the sliding list */}
            <div ref={mobileViewportRef} className="relative z-10 flex-1 overflow-hidden px-6 pb-10">
              <div className="relative w-full max-w-md mx-auto h-full">
                {/* Vertical timeline line (fixed; fills with overall progress) */}
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-border rounded">
                  <motion.div className="absolute top-0 left-0 w-[6px] bg-teal rounded origin-top" style={{ height: lineHeight }} />
                </div>
                {/* Sliding list of experience items */}
                <motion.div ref={mobileListRef} style={{ y: mobileListY }} className="relative flex flex-col gap-8 ml-10">
                  {experiences.map((exp, idx) => {
                    const start = idx === 0 ? 0 : thresholds[idx - 1];
                    const end = thresholds[idx];
                    return (
                      <MobileExperienceItem
                        key={`${exp.company}-${exp.role}-m-${idx}`}
                        exp={exp}
                        idx={idx}
                        start={start}
                        end={end}
                        scrollYProgress={scrollYProgress}
                      />
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative bg-background text-foreground">
      {/* Main container with dynamic height */}
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_DVH}dvh`, minHeight: "120dvh" }} className="relative">
        <div className="sticky top-0 h-dvh flex flex-col relative overflow-hidden">
          {/* Ambient background accents, consistent with other sections */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px] animate-pulse delay-300" />
          </div>

          {/* Section Title */}
          <div className="relative z-10 shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience</h2>
          </div>
          {/* Timeline container */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl">
              {/* Horizontal timeline line */}
              <div className="relative h-[6px] bg-border rounded">
                <motion.div className="absolute left-0 top-0 h-[6px] bg-teal rounded origin-left" style={{ width: lineWidth }} />
              </div>
              {/* Experience items mapped for desktop */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      total={experiences.length}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; // Exporting Experience component
