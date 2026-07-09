/**
 * Quiet night field for the Engineering hero.
 * No stars, orbs, or competing decorative shapes — the ship artwork
 * supplies all visual interest.
 */
export function EngineeringHeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#0a0c14" }}
    />
  );
}
