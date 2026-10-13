import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";

// Separate Formspree form for anonymous feedback (kept distinct from the
// Contact form's endpoint).
const FEEDBACK_FORMSPREE_ENDPOINT = "https://formspree.io/f/moejlpwl";

const categories = [
  "Suggestion",
  "Portfolio Design",
  "Projects or Experience",
  "Something Else",
];

export default function AnonymousFeedback() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "" | "sending" | "success" | "error"
  const submittingRef = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard against duplicate submissions (e.g. rapid double-click before
    // the disabled state re-renders).
    if (submittingRef.current) return;

    if (!message.trim()) {
      setError("Please share a few words before sending.");
      return;
    }
    setError("");

    submittingRef.current = true;
    setStatus("sending");

    try {
      // Formspree's honeypot convention: a field named "_gotcha" that real
      // visitors never see or fill — bots that auto-fill every field trip it,
      // and Formspree silently discards the submission.
      const honeypot = e.target._gotcha.value;

      const res = await fetch(FEEDBACK_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          category: category || "Not specified",
          message,
          _gotcha: honeypot,
        }),
      });

      if (!res.ok) throw new Error("Formspree request failed");

      setStatus("success");
      setCategory("");
      setMessage("");
    } catch (err) {
      console.error("Anonymous feedback submission error:", err);
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-background text-foreground flex items-center justify-center px-6 py-16">
      {/* Ambient background glow, consistent with the rest of the portfolio */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-gradient-to-r from-violet to-teal opacity-15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-gradient-to-r from-teal to-violet opacity-15 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-surface/70 backdrop-blur border border-border rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          Anonymous Feedback
        </h1>
        <p className="text-muted text-sm sm:text-base text-center mb-8">
          Have a thought, suggestion, or honest opinion? Share it with me. No
          name or email required.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Honeypot field — hidden from real visitors via CSS, not just display:none on the label */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          {/* Category dropdown (optional) */}
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="feedback-category">
              Category <span className="text-muted">(optional)</span>
            </label>
            <Dropdown
              id="feedback-category"
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select a category"
            />
          </div>

          {/* Feedback message (required) */}
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="feedback-message">
              Your feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback-message"
              name="message"
              rows={6}
              placeholder="Tell me what you think..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError("");
              }}
              className={`p-3 rounded-md bg-background/60 border ${
                error ? "border-red-500" : "border-border"
              } text-foreground focus:outline-none focus:border-teal transition-colors`}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          {/* Status message */}
          {status === "success" && (
            <p className="text-sm text-green-400">
              Thank you — your feedback was sent anonymously ✅
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again ❌
            </p>
          )}

          <motion.button
            whileHover={status === "sending" ? {} : { scale: 1.03 }}
            whileTap={status === "sending" ? {} : { scale: 0.97 }}
            disabled={status === "sending"}
            type="submit"
            className="bg-gradient-to-r from-teal to-violet hover:opacity-90 disabled:opacity-60 text-background py-3 rounded-md font-semibold transition"
          >
            {status === "sending" ? "Sending..." : "Send Anonymous Feedback"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-muted hover:text-teal transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
