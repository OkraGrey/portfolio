"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Global navigation. Hash targets are written as "/#anchor" so they resolve
 * from any route (sub-pages navigate home, then scroll). A frosted bar with a
 * gradient "HS" mark; collapses to a sheet menu on mobile. Gains a subtle
 * shadow + tighter padding once the page scrolls past the hero.
 */
const NAV_LINKS = [
  { label: "Expertise", href: "/#expertise" },
  { label: "Work", href: "/#work" },
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
        "fixed inset-x-0 top-0 z-50 border-b bg-[rgba(7,8,12,0.72)] backdrop-blur-[14px] backdrop-saturate-150 transition-[padding,border-color,box-shadow] duration-[450ms] ease-out",
        scrolled
          ? "border-white/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "border-white/[0.07]",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-end px-[clamp(20px,5vw,72px)] transition-[padding] duration-[450ms] ease-out",
          scrolled ? "py-3" : "py-4",
        )}
      >
        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-[14px] py-2 text-[14px] font-medium text-[#e6e9f2] no-underline transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-1.5 rounded-full bg-[#f4f7fd] px-[18px] py-[9px] text-[14px] font-semibold text-[#07080c] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_10px_28px_-10px_rgba(244,247,253,0.5)]"
          >
            Let&apos;s talk
          </Link>
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
          className="flex flex-col gap-1 border-t border-white/10 bg-[rgba(8,9,14,0.92)] px-[clamp(20px,5vw,72px)] py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] font-medium text-[#e6e9f2] transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-[#f4f7fd] px-5 py-3 text-center text-[15px] font-semibold text-[#07080c] no-underline"
          >
            Let&apos;s talk
          </Link>
        </nav>
      )}
    </header>
  );
}
