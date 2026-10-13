import { Picture } from "@/components/ui/Picture";
import { SmartLink } from "@/components/ui/SmartLink";
import type { SiteSettings } from "@/content/schema";
import { t } from "@/lib/i18n";

/**
 * The IICE mark, linking home. Until the logo files are supplied (a handover item) it is the name set in type; with
 * logos it shows the light or dark one to match the theme.
 */
export function BrandMark({ logo }: { logo: SiteSettings["logo"] }) {
  return (
    <SmartLink href="/" className="brand" aria-label={t("header.home")}>
      {logo ? (
        <>
          <Picture image={logo.light} priority className="brand__logo dark:hidden" sizes="160px" />
          <Picture
            image={logo.dark}
            priority
            className="brand__logo hidden dark:block"
            sizes="160px"
          />
        </>
      ) : (
        <>
          <span className="brand__name">{t("site.name")}</span>
          <span className="brand__host">{t("site.host")}</span>
        </>
      )}
    </SmartLink>
  );
}
