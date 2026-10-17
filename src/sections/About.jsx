import { motion } from "framer-motion";
import vavatar from "../assets/vavatar-removebg-preview.webp";

export default function About() {
  return (
    <section
      id="about"
      className="w-full relative bg-background text-foreground overflow-hidden"
      aria-label="About me"
    >
      {/* Layered background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-teal opacity-10 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-10 md:py-12 lg:py-16 flex flex-col gap-12">
        
        {/* Profile header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Avatar */}
          <motion.div
            className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px] shrink-0"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 200, damping: 18 } }}
          >
            <img
              src={vavatar}
              alt="Vanshita Roopchandani avatar"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Name + Role + Bio + CTAs */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal to-violet">
              Vanshita Roopchandani
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-foreground/90 font-semibold">
              Full Stack Developer
            </p>

            <p className="mt-4 text-muted leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              My work isn&apos;t limited to what&apos;s on the screen. I enjoy
              understanding the bigger picture, working directly with clients,
              guiding teams through challenges, and making decisions that help
              projects move forward. For me, the best part is connecting the
              technical details with what people actually need.
            </p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {[
                { label: "Experience", value: "4+ years" },
                { label: "Specialty", value: "Full Stack & AWS" },
                { label: "Strengths", value: "Leadership & Solutions" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-border bg-surface px-4 py-3 text-center flex flex-col items-center justify-center min-h-[92px]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-muted">{item.label}</div>
                  <div className="text-base font-semibold text-foreground">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-foreground text-background font-semibold px-5 py-3 hover:bg-foreground/90 transition"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface text-foreground px-5 py-3 hover:border-violet/40 hover:bg-violet/10 transition"
                aria-label="Get in touch"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

