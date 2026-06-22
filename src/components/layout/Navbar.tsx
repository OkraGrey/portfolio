"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const NAV_LINKS = [
  { label: "WORK", href: "#work", external: false },
  { label: "CONTACT", href: "#contact", external: false },
  { label: "GITHUB ↗", href: site.links.github, external: true },
];

/**
 * Fixed translucent navbar. Frosts, tightens, and casts a shadow once the
 * page scrolls past the hero.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(20px,4vw,52px)] backdrop-blur-[13px] backdrop-saturate-150 transition-[background-color,padding,border-color,box-shadow] duration-[450ms] ease-out ${
        scrolled
          ? "border-b border-white/10 bg-[rgba(8,9,14,0.66)] py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "border-b border-white/5 bg-[rgba(8,9,14,0.22)] py-[18px]"
      }`}
    >
      <Reveal
        as="a"
        href="#top"
        trigger="load"
        delay={1.5}
        blur={6}
        className="flex items-center gap-[11px] font-mono text-[13px] tracking-[0.04em] text-bright no-underline"
      >
        <motion.span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-primary"
          style={{ boxShadow: "0 0 12px var(--color-primary)" }}
          animate={{ opacity: [1, 0.45, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        HASNAIN&nbsp;SOHAIL
      </Reveal>

      <Reveal
        as="nav"
        trigger="load"
        delay={1.75}
        blur={6}
        className="flex gap-[clamp(16px,2.4vw,30px)] font-mono text-[11.5px] tracking-[0.12em] text-muted-2"
      >
        {NAV_LINKS.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cfd4e4] no-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="no-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ),
        )}
      </Reveal>
    </header>
  );
}
