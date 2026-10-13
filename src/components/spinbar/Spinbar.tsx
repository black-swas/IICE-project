"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";
import { SpinbarGrid } from "./SpinbarGrid";
import type { SpinbarStageProps } from "./SpinbarStage";
import type { SpinbarItem } from "./types";

/**
 * The spinbar's entry point. It renders the static grid, which is also the server-rendered HTML, so the page is
 * complete and every card is a working link before any script runs. The heavy stage (ring, deck, Motion) is a separate
 * chunk, fetched only when the section is within two screens of the viewport and motion is allowed (TRD §8.2).
 */
export function Spinbar({ items }: { items: readonly SpinbarItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const near = useInView(root, { rootMargin: "200% 0px", once: true });
  const [Stage, setStage] = useState<ComponentType<SpinbarStageProps> | null>(null);

  useEffect(() => {
    if (!near || reduced || Stage) return;
    let live = true;
    void import("./SpinbarStage").then((module) => {
      if (live) setStage(() => module.default);
    });
    return () => {
      live = false;
    };
  }, [near, reduced, Stage]);

  return (
    <div ref={root} className="spinbar">
      {Stage && !reduced ? <Stage items={items} /> : <SpinbarGrid items={items} />}
    </div>
  );
}
