/** Bump when re-importing brand PNGs so browsers fetch fresh assets. */
const BRAND_ASSET_VERSION = "007";

function brandPath(file: string) {
  return `/brand/${file}?v=${BRAND_ASSET_VERSION}`;
}

/**
 * Aredir Labs brand asset system — source transparent assets (light/dark).
 *
 * | Asset          | Light                         | Dark                         |
 * |----------------|-------------------------------|------------------------------|
 * | Logo lockup    | aredir-logo-light.png         | aredir-logo-dark.png         |
 * | Mark           | aredir-mark-light.png         | aredir-mark-dark.png         |
 * | Favicon        | aredir-favicon-light.png      | aredir-favicon-dark.png      |
 */
export const brandAssets = {
  logoLight: brandPath("aredir-logo-light.png"),
  logoDark: brandPath("aredir-logo-dark.png"),
  markLight: brandPath("aredir-mark-light.png"),
  markDark: brandPath("aredir-mark-dark.png"),
  faviconLight: brandPath("aredir-favicon-light.png"),
  faviconDark: brandPath("aredir-favicon-dark.png"),
  favicon32: brandPath("favicon-32.png"),
  favicon64: brandPath("favicon-64.png"),
  favicon180: brandPath("favicon-180.png"),
} as const;
