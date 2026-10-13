import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import FeaturedMilestone from "./sections/FeaturedMilestone";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative animated-gradient text-foreground">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/*
        Single source of truth for spacing between major sections.
        Mobile 40px / tablet 64px / desktop 96px — tune here, not per-section.
      */}
      <div className="flex flex-col gap-10 md:gap-16 lg:gap-24 bg-background">
        {/* Homepage always present (masked reveal) */}
        <Home introDone={introDone} />

        <About />
        <FeaturedMilestone />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
