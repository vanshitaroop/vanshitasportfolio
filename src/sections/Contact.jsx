// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing Particles Background (same as Home component)
import ParticlesBackground from "../components/ParticlesBackground.jsx";

// Importing the contact image asset
import cali from "../assets/cali.png";
import { FaInstagram, FaArrowUpRightFromSquare } from "react-icons/fa6";

// Formspree form endpoint — https://formspree.io/forms
const FORMSPREE_ENDPOINT = "https://formspree.io/f/moejlpel";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Formspree request failed");

      setStatus("success");
      setFormData({name: "",email: "",idea: ""});
    } catch (err) {
      console.error("Formspree Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact" className="w-full relative bg-background overflow-hidden text-foreground py-10 md:py-12 lg:py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Particles Background */}
      <ParticlesBackground />

  

      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex flex-col items-center gap-4"
        >
          <motion.img
            src={cali}
            alt="Calisthenics training"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Instagram link */}
          <a
            href="https://www.instagram.com/v_is_mastikhor?xtok=MTdjcDJjeDJtZm5qeg=="
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <FaInstagram className="text-base transition-colors group-hover:text-teal" />
            <span className="bg-gradient-to-r from-teal to-violet bg-clip-text text-transparent font-medium transition-opacity group-hover:opacity-80">
              I have a life outside work, too.
            </span>
            <FaArrowUpRightFromSquare className="text-xs transition-colors group-hover:text-violet" />
          </a>
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-surface/70 p-8 rounded-2xl shadow-lg border border-border"
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">Let’s Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-background/60 border ${
                  errors.name ? "border-red-500" : "border-border"
                } text-foreground focus:outline-none focus:border-teal`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div className="flex flex-col">
              <label className="mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-background/60 border ${
                  errors.email ? "border-red-500" : "border-border"
                } text-foreground focus:outline-none focus:border-teal`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Idea textarea */}
            <div className="flex flex-col">
              <label className="mb-1">
                Idea <span className="text-red-500">*</span>
              </label>

              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-background/60 border ${
                  errors.idea ? "border-red-500" : "border-border"
                } text-foreground focus:outline-none focus:border-teal`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* Status message */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
                bg-gradient-to-r from-teal to-violet
                hover:opacity-90
                disabled:opacity-60
                text-background
                py-3
                rounded-md
                font-semibold
                transition
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
