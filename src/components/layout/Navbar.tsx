"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Global navigation. Hash targets are written as "/#anchor" so they resolve
 * from any route (sub-pages navigate home, then scroll). Frosts and tightens
 * once the page scrolls past the hero. Collapses to a sheet menu on mobile.
 */
const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-[13px] backdrop-saturate-150 transition-[background-color,padding,border-color,box-shadow] duration-[450ms] ease-out",
        scrolled
          ? "border-b border-white/10 bg-[rgba(8,9,14,0.66)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "border-b border-white/5 bg-[rgba(8,9,14,0.22)]",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-[clamp(20px,4vw,52px)] transition-[padding] duration-[450ms] ease-out",
          scrolled ? "py-3" : "py-[18px]",
        )}
      >
        <Link
          href="/"
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
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[clamp(16px,2.4vw,30px)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted-2 no-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/#contact" variant="primary" size="sm">
            Contact
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <nav
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-white/10 bg-[rgba(8,9,14,0.92)] px-[clamp(20px,4vw,52px)] py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-muted-2 transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-2 pt-2">
            <Button
              href="/#contact"
              variant="primary"
              size="sm"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Contact
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
