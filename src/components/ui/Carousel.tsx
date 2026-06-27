"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface CarouselProps {
  /** One node per slide. */
  children: React.ReactNode[];
  /** Applied to each slide container (controls basis/width). */
  slideClassName?: string;
  /** Autoplay interval in ms; omit to disable autoplay. */
  autoplayDelay?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  ariaLabel: string;
}

/**
 * Generic Embla carousel wrapper: swipe, arrows, dots, and optional autoplay.
 * Autoplay is not registered under prefers-reduced-motion, leaving a fully
 * static, swipe-only carousel.
 */
export function Carousel({
  children,
  slideClassName,
  autoplayDelay,
  loop = true,
  showArrows = true,
  showDots = true,
  ariaLabel,
}: CarouselProps) {
  const reduced = useReducedMotion();
  // Memoized so the autoplay instance is stable across renders (recreating it
  // on every render stalls playback).
  const plugins = useMemo(
    () =>
      autoplayDelay && !reduced
        ? [
            Autoplay({
              delay: autoplayDelay,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]
        : [],
    [autoplayDelay, reduced],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start", dragFree: false },
    plugins,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    };
    sync();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", sync);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  const arrowCls =
    "grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary/50 hover:text-foreground";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="relative"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children.map((child, i) => (
            <div key={i} className={cn("min-w-0 shrink-0", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {(showArrows || showDots) && snaps.length > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          {showDots ? (
            <div className="flex items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selectedIndex}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    i === selectedIndex ? "bg-primary" : "bg-line hover:bg-muted",
                  )}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {showArrows && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={scrollPrev}
                className={arrowCls}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={scrollNext}
                className={arrowCls}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
