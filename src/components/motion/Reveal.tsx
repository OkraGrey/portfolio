"use client";

import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType, ReactNode } from "react";

/**
 * Reveal — the signature "denoise" entrance: content fades in while a blur
 * resolves and it lifts into place. Mirrors the reference motion language.
 *
 *  - `trigger="load"`  animates on mount (hero, navbar).
 *  - `trigger="inView"` animates when scrolled into view (default).
 *
 * Honours `prefers-reduced-motion`, and any subtree wrapped in InstantMotion
 * (via the InstantReveal context) renders content immediately with no
 * animation — used on sub-pages where the route transition is the entrance.
 */

/** When true (provided by InstantMotion), Reveals render statically. */
export const InstantReveal = createContext(false);

type RevealTag =
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "a"
  | "nav"
  | "header"
  | "section"
  | "li"
  | "ul";

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to `div`. */
  as?: RevealTag;
  /** Delay before the entrance, in seconds. */
  delay?: number;
  /** Starting blur radius, in px. */
  blur?: number;
  /** Starting vertical offset, in px. */
  y?: number;
  /** Entrance duration, in seconds. */
  duration?: number;
  trigger?: "load" | "inView";
  /** For `inView`: only animate the first time it enters. */
  once?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  style?: React.CSSProperties;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // expressive ease-out

export function Reveal({
  children,
  as = "div",
  delay = 0,
  blur = 8,
  y = 14,
  duration = 1.2,
  trigger = "inView",
  once = true,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const instant = useContext(InstantReveal);

  // motion exposes a motion-enabled component per intrinsic tag.
  const Component = motion[as] as ComponentType<Record<string, unknown>>;

  // Opt-out via context (InstantMotion) is SSR-safe — the value is identical on
  // server and client — so we can drop the animation entirely for sub-pages.
  if (instant) {
    return <Component {...rest}>{children}</Component>;
  }

  const hidden = { opacity: 0, y, filter: `blur(${blur}px)` };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  // initial/animate stay constant across server + client; only the timing reacts
  // to reduced-motion (which differs between server and a reduced-motion client),
  // so the SSR'd hidden state always matches the client's initial state.
  const transition = {
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: EASE,
  };

  const triggerProps =
    trigger === "load"
      ? { initial: hidden, animate: shown }
      : {
          initial: hidden,
          whileInView: shown,
          viewport: { once, margin: "-12% 0px" },
        };

  return (
    <Component transition={transition} {...triggerProps} {...rest}>
      {children}
    </Component>
  );
}
