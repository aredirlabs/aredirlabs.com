# UI Patterns

Reusable UI patterns for Aredir Labs marketing and product surfaces.

## Layout

- **Page shell:** Consistent header, main landmark, footer.
- **Content width:** Max-width container for readability (`max-w-*` + horizontal padding).
- **Section rhythm:** Consistent vertical spacing between sections (e.g. `py-16` / `py-24`).

## Typography

- One primary heading per page (`h1`).
- Section titles use descending heading levels without skips.
- Body text: comfortable line height (`leading-relaxed` or project token).

## Buttons and links

- Primary CTA: single clear action per viewport section when possible.
- External links: `target="_blank"` with `rel="noopener noreferrer"`.
- Button vs link: use `<button>` for actions, `<a>` for navigation.

## Forms

- Labels associated with inputs (`htmlFor` / `id`).
- Visible focus rings; do not remove outline without replacement.
- Inline validation messages linked via `aria-describedby`.
- Submit loading and success/error states.

## Navigation

- Mobile: accessible menu (keyboard trap managed, escape to close).
- Current page indicated for active nav items (`aria-current="page"`).

## Media

- Use `next/image` with explicit dimensions or `fill` + `sizes`.
- Meaningful `alt` text; decorative images use `alt=""`.

## Dark mode

- When enabled, test contrast in both themes.
- Prefer CSS variables / Tailwind `dark:` variants over duplicate components.

## Motion

- Respect `prefers-reduced-motion`.
- Keep animations subtle and purposeful.

## Related

- [Component guidelines](./component-guidelines.md)
- [Brand guide](../brand/brand-guide.md)
