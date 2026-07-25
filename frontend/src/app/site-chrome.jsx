"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Nav } from "@/components/Nav";

export function SiteChrome({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Nav />
      {children}
      <Toaster position="top-center" richColors />
    </div>
  );
}
