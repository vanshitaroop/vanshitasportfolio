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

// Mobile timeline item: animates in via whileInView as it naturally scrolls
// past, instead of being scrubbed by a pinned sticky container. Pinning the
// whole section on mobile (previous approach) fought with the inner
// overflow-y-auto list for the scroll gesture, so the section would unpin —
// handing scroll to the next section — before the last card finished
// animating in, producing an abrupt cut/overlap.
function MobileExperienceItem({ exp, idx }) {
  const companyLabel = exp.about ? `${exp.company} (${exp.about})` : exp.company;
  const metaLine = [companyLabel, exp.duration].join(" | ") + (exp.location ? ` · ${exp.location}` : "");

  return (
    <div className="relative flex items-start">
      {/* Marker dot on mobile timeline */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4 }}
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-teal shadow-[0_0_0_8px_rgba(22,224,196,0.15)]"
      />
      {/* Experience card (mobile version) */}
      <motion.article
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: idx * 0.06 }}
        className="bg-surface/80 backdrop-blur border border-border rounded-xl p-4 w-[90vw] max-w-sm ml-6 shadow-lg"
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

  // Dynamic scene height for the desktop scroll-scrubbed scene
  const SCENE_HEIGHT_DVH = 100 * experiences.length * 1.2;

  // Get scroll progress for animations (desktop only — the ref is only
  // attached to a mounted element on desktop, see below)
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  // Calculate thresholds for each experience card's animation start/end
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  // Animate timeline line width (desktop)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  // Mobile: plain document flow, no sticky pin / scroll-jacking — each card
  // fades in with whileInView as it scrolls past (see MobileExperienceItem).
  if (isMobile) {
    return (
      <section id="experience" className="relative bg-background text-foreground overflow-hidden px-6 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px] animate-pulse delay-300" />
        </div>

        <h2 className="relative z-10 text-4xl sm:text-5xl font-semibold text-center mb-10">Experience</h2>

        <div className="relative z-10 w-full max-w-md mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-border rounded">
            <div className="absolute top-0 left-0 w-[6px] h-full bg-teal rounded" />
          </div>
          {/* Experience items mapped for mobile */}
          <div className="relative flex flex-col gap-8 ml-10">
            {experiences.map((exp, idx) => (
              <MobileExperienceItem key={`${exp.company}-${exp.role}-m-${idx}`} exp={exp} idx={idx} />
            ))}
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
