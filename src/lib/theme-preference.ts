export const PUBLIC_THEME_STORAGE_KEY = "aredir-theme";
export const AUTHENTICATED_THEME_STORAGE_KEY = "aredir-auth-theme";

export type Theme = "dark" | "light";

export function isAuthenticatedPath(pathname: string) {
  return pathname === "/workspace" || pathname.startsWith("/workspace/");
}

function storedTheme(value: string | null): Theme | null {
  return value === "dark" || value === "light" ? value : null;
}

export function resolveAuthenticatedTheme(value: string | null): Theme {
  return storedTheme(value) === "light" ? "light" : "dark";
}

export function resolvePublicTheme(
  value: string | null,
  prefersDark: boolean,
): Theme {
  const stored = storedTheme(value);
  if (stored) return stored;
  return prefersDark ? "dark" : "light";
}

export function resolveThemeForPath({
  pathname,
  publicPreference,
  authenticatedPreference,
  prefersDark,
}: {
  pathname: string;
  publicPreference: string | null;
  authenticatedPreference: string | null;
  prefersDark: boolean;
}): Theme {
  return isAuthenticatedPath(pathname)
    ? resolveAuthenticatedTheme(authenticatedPreference)
    : resolvePublicTheme(publicPreference, prefersDark);
}

/**
 * Runs from next/script beforeInteractive on the initial document load.
 * Client transitions are handled by AuthenticatedThemeProvider's layout effect.
 */
export const THEME_INITIALIZATION_SCRIPT = `(function(){
  var pathname=window.location.pathname;
  var authenticated=pathname==='/workspace'||pathname.indexOf('/workspace/')===0;
  var key=authenticated?'${AUTHENTICATED_THEME_STORAGE_KEY}':'${PUBLIC_THEME_STORAGE_KEY}';
  var stored=null;
  try{stored=window.localStorage.getItem(key);}catch(e){}
  var prefersDark=false;
  if(!authenticated&&stored!=='dark'&&stored!=='light'){
    try{prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;}catch(e){}
  }
  var dark=authenticated?stored!=='light':stored==='dark'||(stored!=='light'&&prefersDark);
  document.documentElement.classList.toggle('dark',dark);
})()`;
