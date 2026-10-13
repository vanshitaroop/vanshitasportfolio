import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

// Lightweight custom-styled dropdown — avoids the native <select> popup,
// which browsers render with their own unstyled OS theme regardless of CSS.
// Built with only what's already installed (React + Tailwind + framer-motion).
export default function Dropdown({ id, value, onChange, options, placeholder = "Select an option" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 p-3 rounded-md bg-background/60 border border-border text-foreground focus:outline-none focus:border-teal transition-colors"
      >
        <span className={value ? "text-foreground" : "text-muted"}>
          {value || placeholder}
        </span>
        <FaChevronDown
          className={`text-xs text-muted shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-md border border-border bg-surface shadow-lg"
          >
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-muted transition-colors hover:bg-teal/10 hover:text-foreground"
              >
                {placeholder}
              </button>
            </li>
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-teal/10 ${
                    value === opt ? "text-teal font-medium" : "text-foreground"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
