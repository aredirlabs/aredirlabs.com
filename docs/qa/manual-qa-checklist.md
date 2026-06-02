# Manual QA Checklist

Run on **local** or **Vercel preview** before approving a PR. Check items that apply to the change.

## Setup

- [ ] Correct branch / preview URL noted in PR
- [ ] Build succeeded (`npm run build` or CI)
- [ ] No console errors on initial load (browser devtools)

## Global

- [ ] Page loads without 500/404 on changed routes
- [ ] Header and footer render; navigation works
- [ ] Links go to correct destinations (internal and external)
- [ ] Favicon and page title reasonable

## Responsive

- [ ] Mobile viewport (~375px)
- [ ] Tablet (~768px)
- [ ] Desktop (~1280px)
- [ ] No horizontal scroll overflow

## Accessibility (smoke)

- [ ] Keyboard: Tab through interactive elements; visible focus
- [ ] Headings in logical order
- [ ] Images have appropriate alt text
- [ ] Form labels associated with inputs (if forms changed)

## Visual

- [ ] Matches design / brand intent for changed UI
- [ ] Light mode acceptable
- [ ] Dark mode acceptable (if supported)

## Regression (scope-dependent)

- [ ] Unaffected pages still load
- [ ] Critical CTAs still work

## Sign-off

| Reviewer | Date | Environment | PR / branch |
|----------|------|-------------|-------------|
| | | Local / Preview | |

## Related

- [UAT checklist](./uat-checklist.md)
- [Deployment workflow](../engineering/deployment-workflow.md)
