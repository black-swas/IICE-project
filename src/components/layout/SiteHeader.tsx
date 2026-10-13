import { ButtonLink } from "@/components/ui/ButtonLink";
import { t } from "@/lib/i18n";
import { BrandMark } from "./BrandMark";
import { getChrome } from "./chrome";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ScrollHeader } from "./ScrollHeader";
import { StatusPill } from "./StatusPill";

/**
 * The sticky header (SPEC §2.1, §3 #2): brand, "Supported by" lockup from 1024 px, the menu, the intake pill from
 * 1280 px, and the Apply button, which stays in the bar at every width. Below 1024 px the menu is a drawer.
 */
export function SiteHeader() {
  const { site, nav, opportunities, buildTime, opportunitiesHref } = getChrome();
  const pill = (
    <StatusPill
      opportunities={opportunities}
      preferredSlug={site.intakeStatusOpportunity}
      buildTime={buildTime}
      href={opportunitiesHref}
    />
  );
  // Until some pages exist there is no menu to show, and an empty one would be an empty landmark.
  const hasMenu = nav.primary.length > 0;
  const supporters = site.coBranding.map((c) => c.shortName ?? c.name);

  return (
    <ScrollHeader>
      <div className="site-header__bar wrapper-wide">
        <BrandMark logo={site.logo} />
        {supporters.length > 0 ? (
          <p className="site-header__supporters">
            <span>{t("header.supportedBy")}</span> {supporters.join(" · ")}
          </p>
        ) : null}
        {hasMenu ? <DesktopNav items={nav.primary} /> : null}
        <div className="site-header__actions">
          <div className="site-header__pill">{pill}</div>
          {nav.cta ? (
            <ButtonLink
              href={nav.cta.href}
              variant="accent"
              {...(nav.cta.unbuilt ? { "data-todo": "unbuilt-link" } : {})}
            >
              {nav.cta.label}
            </ButtonLink>
          ) : null}
          {hasMenu ? <MobileNav items={nav.primary}>{pill}</MobileNav> : null}
        </div>
      </div>
    </ScrollHeader>
  );
}
