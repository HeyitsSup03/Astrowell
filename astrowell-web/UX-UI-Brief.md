# Astrowell — UX/UI Brief

## 1. Design Principles
- **Trust first.** This is a platform where people pay for guidance and share sensitive personal/birth data — every screen should feel calm, premium, and legible, never carnival-esque or "spammy app."
- **Mobile-first, always.** Design and build at 375px baseline before adding desktop overrides. Desktop is an expansion of the mobile layout (more breathing room, sidebar nav), not a separate design.
- **Gold is earned, not everywhere.** Accent gold is reserved for primary calls-to-action, ratings, and premium markers. Overusing it cheapens the "premium consultation" feel.
- **Consistency over novelty.** Every screen pulls from the same small set of `components/ui/` primitives. No one-off styled elements.

## 2. Color Tokens

### Light theme
| Token | Hex | Use |
|---|---|---|
| primary | `#2E1A47` | Headers, nav, primary buttons |
| primary-light | `#4B2E83` | Hover states, gradients |
| accent | `#D4A24C` | CTAs, ratings, premium badges |
| secondary | `#7A1F3D` | Category tags, alerts |
| background | `#FDF8F0` | App base (warm cream, not stark white) |
| surface | `#FFFFFF` | Cards |
| text-primary | `#1F1B24` | Body copy |
| text-muted | `#6B6470` | Secondary text |
| success | `#3E8E5A` | Confirmed states, online status |
| danger | `#C0392B` | Errors, low-balance warnings |

### Dark theme
| Token | Hex |
|---|---|
| background-dark | `#1A1226` |
| surface-dark | `#241934` |
| text-primary-dark | `#F2EDF7` |
| text-muted-dark | `#A99CB5` |

(primary/accent/secondary/success/danger stay identical in dark mode — only background/surface/text shift.)

## 3. Typography
- **Display/Headings (H1, H2, hero copy only):** Cormorant Garamond — elegant serif, used sparingly for the "premium astrology" feel.
- **Body/UI (everything else):** Inter — clean, legible at small mobile sizes.
- Base body size: 16px mobile → 18px desktop. Headings scale via `clamp()` rather than separate mobile/desktop overrides.
- Never use the display font for buttons, form labels, or dense UI text — it hurts legibility at small sizes.

## 4. Iconography
- `lucide-react` exclusively, single line-weight style. Do not mix icon packs.
- Common set: star (rating), calendar (bookings), message-circle (chat), wallet, user, video, phone, shopping-bag, book-open, heart-pulse.

## 5. Layout & Breakpoints
- Tailwind defaults: `sm:640px · md:768px · lg:1024px · xl:1280px · 2xl:1536px`.
- Cap main content width on desktop with `max-w-6xl mx-auto` — never let text/cards stretch edge-to-edge on large screens. Use extra desktop width for a persistent sidebar, not wider text blocks.
- Bottom tab bar is mobile-only (below `lg:`); becomes a left sidebar at `lg:` and above (customer interface). See App Flow doc §3 for provider/admin nav behavior.

## 6. Component States (apply to every list/card/form)
- **Loading:** skeleton placeholders matching the final layout — never a bare spinner on content-heavy screens.
- **Empty:** illustration/icon + short copy + a clear CTA (never a blank screen).
- **Error:** inline card with a Retry action, styled with the `danger` token — never a hard crash or unstyled browser error.
- **Success confirmation:** short toast or inline banner using the `success` token (e.g., "Booking Confirmed!").

## 7. Key Components (from `components/ui/`)
Button (primary / accent / outline variants), Card, Badge (status / category / rating variants), Avatar, Input, Modal, Tabs — every screen must compose from these, extending only via props, not new one-off markup.

## 8. Reference Screens (already mocked)
- Landing/home: gradient hero in primary→primary-light, gold CTA, warm cream body background.
- Provider card: avatar, online-status dot (success token), star rating, category tag, rate/min, gold "Book Now" button.
- Booking details: card-based summary, clear price breakdown, gold "Proceed to Pay" CTA.
- Chat: bubble UI, sent messages in primary, received in surface/muted, timestamp under each.
- Wallet: large balance figure in accent/gold-adjacent weight, recent transactions list, gold "Add Money" CTA.

## 9. Accessibility Notes
- Verify text-on-gradient contrast meets WCAG AA at actual rendered size — the gradient hero banner is the highest-risk spot for this.
- All interactive elements need visible focus states (not just hover) — required for keyboard and screen-reader users booking real paid sessions.
- Never convey status by color alone (e.g., online/offline) — pair with a label or icon, since colorblind users need a second signal.
