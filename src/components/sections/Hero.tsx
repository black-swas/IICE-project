import { ButtonLink } from "@/components/ui/ButtonLink";
import { getHomePage, getStages } from "@/content/loaders";
import { getKnownRoutes } from "@/content/routes";
import { display } from "@/content/todo";
import { t } from "@/lib/i18n";
import { isBuilt } from "@/lib/nav";
import { parseEmphasis } from "@/lib/text";

/**
 * The hero (SPEC §3 #3): headline with emphasised words, one line of sub-copy, two calls to action and the three-stage
 * strip. The background is a CSS molecular-grid motif, not an image or video, so nothing here costs a request and the
 * headline is the largest contentful element. A call to action whose page does not exist is left out (rule 4).
 */
export function Hero() {
  const { hero } = getHomePage();
  const routes = getKnownRoutes();
  const stages = getStages();
  const ctas = [
    { cta: hero.primaryCta, variant: "accent" as const },
    { cta: hero.secondaryCta, variant: "inverse" as const },
  ].filter(({ cta }) => isBuilt(cta.href, routes));

  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner wrapper-wide">
        <h1 id="hero-title" className="hero__title">
          {parseEmphasis(display(hero.headline)).map((segment, index) =>
            segment.emphasis ? (
              <em key={index} className="hero__em">
                {segment.text}
              </em>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </h1>
        <p className="hero__subcopy">{display(hero.subcopy)}</p>
        {ctas.length > 0 ? (
          <p className="hero__actions">
            {ctas.map(({ cta, variant }) => (
              <ButtonLink key={cta.href} href={cta.href} variant={variant}>
                {display(cta.label)}
              </ButtonLink>
            ))}
          </p>
        ) : null}
        <ol className="hero__stages" aria-label={t("home.stagesLabel")}>
          {stages.map((stage, index) => (
            <li key={stage.slug}>
              <span className="hero__stage-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{display(stage.name)}</strong>
              <span>{display(stage.tagline)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
