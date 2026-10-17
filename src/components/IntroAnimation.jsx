import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import logo from "../assets/logof.webp";

gsap.registerPlugin(MorphSVGPlugin);

export default function IntroAnimation({ onFinish }) {
  const greetings = [
    "Hello", "नमस्ते", "Hola", "Bonjour",
    "Ciao", "Olá", "Здравствуйте",
    "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ];

  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);
  const logoRef = useRef(null);
  const finishedRef = useRef(false);

  // onFinish must fire exactly once. Guarded so the watchdog below and the
  // real GSAP completion can't both call it.
  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish && onFinish();
  };

  // Safety net: the real completion path is a chain of ~12 timers plus one
  // GSAP timeline, with no error handling. If any link breaks (a ref not
  // ready, a tab backgrounded mid-sequence throttling timers, a GSAP hiccup)
  // there's otherwise nothing to recover and the overlay is stuck forever.
  // This guarantees the intro always releases the page within a bounded time.
  useEffect(() => {
    const maxDuration = greetings.length * 180 + 300 + 1800 + 2000;
    const watchdog = setTimeout(finish, maxDuration);
    return () => clearTimeout(watchdog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logo fades in once and stays static while the greeting cycles beneath it.
  // xPercent: -50 is kept in both keyframes because GSAP writes its own
  // inline `transform`, which would otherwise clobber the `-translate-x-1/2`
  // Tailwind class used to center the logo (inline styles win over classes).
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -12, xPercent: -50 },
      { opacity: 1, y: 0, xPercent: -50, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    let greetingTimer;

    if (index < greetings.length - 1) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );
      greetingTimer = setTimeout(() => setIndex(i => i + 1), 180);
    } else {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );

      greetingTimer = setTimeout(() => {
        // If a ref isn't ready or GSAP throws, fall back to finishing
        // immediately rather than leaving the overlay stuck on screen.
        try {
          if (!overlayRef.current || !greetingRef.current) {
            finish();
            return;
          }

          const path = overlayRef.current.querySelector("path");
          const tl = gsap.timeline({ onComplete: finish });

          tl.to([overlayRef.current, greetingRef.current], {
            duration: 1.8,
            y: "-100vh",
            ease: "power4.inOut",
          });

          if (path) {
            tl.to(
              path,
              {
                duration: 1.8,
                morphSVG: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z",
                ease: "power4.inOut",
              },
              "<"
            );
          }
        } catch (err) {
          console.error("IntroAnimation transition failed:", err);
          finish();
        }
      }, 300);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-foreground overflow-hidden pointer-events-none"
    >
      <img
        ref={logoRef}
        src={logo}
        alt="vworks"
        draggable="false"
        className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 h-16 sm:h-20 w-auto select-none z-20"
      />

      <h1
        ref={greetingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20"
      >
        {greetings[index]}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>
    </div>
  );
}
