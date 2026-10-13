// Importing React library so we can create and use components
import React from "react";

// Cartoon-style avatars (inline SVG components, no external photos)
import { SidhantAvatar, DiviyamAvatar, RushirajAvatar } from "../components/CartoonAvatar";

// LinkedIn icon for each card
import { FaLinkedin } from "react-icons/fa";

// Importing Framer Motion for smooth animations
import { motion } from "framer-motion";

// Creating shorter variables for motion components to make code cleaner
const MH2 = motion.h2; // Animated <h2> tag
const MDiv = motion.div; // Animated <div> tag

// Array containing all testimonial data (name, role, review, linkedin, avatar).
// `approved: false` means the quote is a DRAFT the person hasn't signed
// off on yet — swap in their confirmed wording and flip it to `true`
// before treating any of these as a genuine published testimonial.
const testimonials = [
  {
    name: "Sidhant Roopchandani",
    role: "CEO at SIDCARE",
    review:
      "Vanshita has been a great help in growing SIDCARE's online presence. Her work on the website and marketing helped increase our sales by 20% in six months. She takes ownership, handles challenges well, and makes sure things keep moving.",
    linkedin: "https://www.linkedin.com/in/sidhantroopchanadani/",
    approved: false,
    Avatar: SidhantAvatar,
  },
  {
    name: "Divyam Shah",
    role: "Co-founder of Bucketlist",
    review:
      "I like how Vanshita approaches development. She pays attention to the little details and cares about making things work well for the people using them.",
    linkedin: "https://www.linkedin.com/in/divyam-shah-179a09282/",
    approved: false,
    Avatar: DiviyamAvatar,
  },
  {
    name: "Rushiraj Parmar",
    role: "Building Xillion",
    review:
      "Vanshita has a good eye for frontend design. She understands how to turn an idea into something that looks good and feels easy to use.",
    linkedin: "https://www.linkedin.com/in/rushirajsinhparmar/?trk=blended-typeahead",
    approved: false,
    Avatar: RushirajAvatar,
  },
];

// Functional component for Testimonials section
function Testimonials() {
  return (
    // Section wrapper with styling
    <section
      id="testimonials" // ID for navigation
      className="relative bg-background text-foreground flex flex-col items-center justify-center px-6 py-10 md:py-12 lg:py-16 overflow-hidden"
      // Black background, white text, centered content
    >
      {/* Ambient background accents, consistent with other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px] animate-pulse delay-300" />
      </div>

      {/* Animated Section Title */}
      <MH2
        initial={{ opacity: 0, y: -50 }} // Start invisible & slightly above
        animate={{ opacity: 1, y: 0 }} // Fade in & slide down
        transition={{ duration: 0.6 }} // Animation duration is 0.6s
        className="relative z-10 text-4xl font-bold mb-16" // Styling for title
      >
        What People Say
      </MH2>

      {/* Grid for all testimonial cards — single row of 3 on desktop, stacked on mobile */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl w-full justify-items-center">
        {/* Looping through testimonials array to create each card */}
        {testimonials.map((testi, idx) => {
          const Avatar = testi.Avatar;
          return (
            <MDiv
              key={testi.name + idx} // Unique key for React rendering
              initial={{ opacity: 0, y: 50 }} // Start invisible & slightly below
              whileInView={{ opacity: 1, y: 0 }} // Animate when in viewport
              transition={{ duration: 0.5, delay: idx * 0.2 }} // Stagger effect based on index
              viewport={{ once: true }} // Animate only the first time it's visible
              className="group bg-surface backdrop-blur-lg border border-border rounded-2xl p-6 flex flex-col items-center text-center w-full max-w-sm transform transition duration-500 hover:scale-105 hover:-rotate-1 hover:border-teal/40"
              // Dark surface card, rounded corners, hover animation with subtle teal lift
            >
              {/* Cartoon avatar */}
              <Avatar
                className="w-20 h-20 rounded-full border-2 border-border mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-teal/50"
              />

              {/* Testimonial Review Text */}
              <p className="text-foreground/90 italic mb-4">
                "{testi.review}"
              </p>

              {/* Name of the person + LinkedIn icon */}
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-lg font-semibold text-foreground">{testi.name}</h3>
                <a
                  href={testi.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${testi.name.split(" ")[0]}'s LinkedIn profile`}
                  className="text-muted hover:text-teal transition-colors duration-300"
                >
                  <FaLinkedin size={16} />
                </a>
              </div>

              {/* Their role/job title */}
              <p className="text-sm text-muted">{testi.role}</p>
            </MDiv>
          );
        })}
      </div>
    </section>
  );
}

// Exporting the component so it can be used in App.jsx
export default Testimonials;
