"use client";

import { motion } from "framer-motion";

// Masked line-by-line reveal for headlines
export const MaskLines = ({ lines, className = "", delay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="reveal-mask">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

// Scroll-triggered fade/slide reveal
export const Reveal = ({ children, delay = 0, y = 40, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    {...rest}
  >
    {children}
  </motion.div>
);