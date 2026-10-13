import { SearchTrigger } from "@/components/search/SearchTrigger";
import { SmartLink } from "@/components/ui/SmartLink";
import { t } from "@/lib/i18n";
import { AnnouncementTicker } from "./AnnouncementTicker";
import { getChrome } from "./chrome";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggle } from "./ThemeToggle";

/** The 36 px bar above the header (SPEC §3 #1): announcements on the left; socials, portal, theme and search on the right. */
export function UtilityBar() {
  const { site, announcements, buildTime, applyHref, email } = getChrome();
  return (
    <div className="utility-bar">
      <div className="utility-bar__inner wrapper-wide">
        <AnnouncementTicker items={announcements} buildTime={buildTime} />
        <div className="utility-bar__tools">
          <SocialLinks socials={site.socials} className="social-links social-links--bar" />
          {site.startupPortalUrl ? (
            <SmartLink href={site.startupPortalUrl} className="utility-link">
              {t("utility.startupPortal")}
            </SmartLink>
          ) : null}
          <ThemeToggle />
          <SearchTrigger applyHref={applyHref} email={email} />
        </div>
      </div>
    </div>
  );
}
