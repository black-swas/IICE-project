import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Heading id, so the section can point `aria-labelledby` at it. */
  id: string;
  eyebrow: string;
  /** The "01 /" ordinal. Derive it from the order of the sections that actually render, never type it. */
  number?: number;
  title: string;
  subline?: string | undefined;
  /** Right-aligned mono label, e.g. "STARTUP SPOTLIGHT (06)". Derive any count in it from the data. */
  rightLabel?: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered eyebrow, large title, muted subline and an optional mono label (SPEC §5.2). */
export function SectionHeader({
  id,
  eyebrow,
  number,
  title,
  subline,
  rightLabel,
}: SectionHeaderProps) {
  return (
    <header className="wrapper-wide flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-8">
      <div className="max-w-measure">
        <p className="font-mono text-eyebrow tracking-[0.12em] text-muted uppercase">
          {number === undefined ? eyebrow : `${pad(number)} / ${eyebrow}`}
        </p>
        <h2 id={id} className="mt-3 font-display text-h2 text-ink">
          {title}
        </h2>
        {subline ? <p className="mt-3 text-muted">{subline}</p> : null}
      </div>
      {rightLabel ? (
        <p className="font-mono text-eyebrow tracking-[0.12em] text-muted uppercase">
          {rightLabel}
        </p>
      ) : null}
    </header>
  );
}
