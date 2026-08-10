# Astrowell — App Flow Document

Every page, grouped by persona, followed by end-to-end journeys with button-level detail.

## 1. Sitemap

### Public
- `/` — Landing page (hero, category grid, top providers, CTA to sign up)
- `/login`, `/register` — Auth

### Customer (`(customer)` route group)
- `/dashboard` — Provider discovery (filterable list/grid)
- `/providers/[id]` — Provider profile
- `/kundli/generate` — Individual Kundli generation
- `/kundli/match` — Kundli compatibility matching
- `/appointments` — Booking list (upcoming/past)
- `/chat/[conversationId]` — 1:1 chat screen
- `/call/[sessionId]` — Voice/video call screen
- `/courses` — Course catalog
- `/courses/[id]` — Course detail + enroll
- `/shop` — Product catalog
- `/shop/cart`, `/shop/checkout`, `/shop/orders`
- `/wallet` — Balance + transactions

### Provider (`(provider)` route group)
- `/dashboard` — Today's sessions + earnings summary
- `/availability` — Weekly slot management
- `/courses/manage` — Create/edit courses
- `/kyc` — Document submission + approval status

### Admin (`(admin)` route group)
- `/providers/approve` — KYC approval queue
- `/payouts` — Payout batch processing
- `/moderation` — Flagged chats/reviews
- `/analytics` — Platform stats

## 2. Key User Journeys

### 2.1 Customer: Discover → Book → Pay → Session → Review
1. Land on `/` → tap a category icon (e.g., "Astrology") → routed to `/dashboard` pre-filtered by category.
2. Browse provider cards → tap a card → `/providers/[id]`.
3. Tap **Book Now** → slot picker modal opens (shows provider's available slots, pulled from `availabilitySlots` minus existing bookings).
4. Select slot + mode (chat/call/video) → tap **Continue** → booking summary screen shows session charge + platform fee + total.
5. If wallet balance < total → show **Add Money** prompt inline, blocking further progress until resolved.
6. Tap **Proceed to Pay** → wallet debited (or booking marked `pending` if paying at session start, per per-minute billing model) → `appointments` doc created with `status: confirmed`.
7. Confirmation screen + notification sent → appears in `/appointments`.
8. At scheduled time, customer opens the appointment card → **Join Session** button becomes active → routes to `/chat/[id]` or `/call/[id]`.
9. During a live call/video session: wallet balance visibly ticking down; at low balance, an in-session banner warns and offers **Add Money**; at zero, session force-ends with a graceful "session ended — low balance" screen.
10. On session end → redirected to a **Rate this session** prompt (Review component) → submits to `reviews`.

### 2.2 Customer: Kundli Match
1. From `/dashboard` or nav, tap **Kundli Match**.
2. Step 1 — "Your Details": pick an existing saved Birth Profile or tap **+ Add New** to fill name/DOB/TOB/place-of-birth.
3. Step 2 — "Partner's Details": same pattern.
4. Tap **Check Compatibility** → loading state (skeleton, not spinner) while the match is computed/cached.
5. Result screen: total score out of 36 shown large at top, verdict banner colored by range (success/accent/danger), 8-kuta breakdown list, dosha badges if flagged.
6. Tap **Download Report** → generates/fetches PDF → opens in new tab / triggers download.
7. Tap **Talk to an Astrologer about this** → deep-links into provider discovery filtered to "Astrology" category, carrying the match result as context for the chat/session.

### 2.3 Customer: Chatbot Escalation
1. Tap the chat bubble (floating action button, available across customer screens).
2. Bot greets, offers quick-reply chips (How to book / Pricing / My Kundli).
3. If the question matches an FAQ intent → canned response.
4. If ambiguous and customer has a saved Kundli → bot fetches it as context → gives a grounded answer.
5. If bot confidence is low or customer explicitly asks → **Connect with an astrologer** button appears → routes into booking flow (2.1, step 3) pre-filtered to available-now providers.

### 2.4 Provider: Onboarding → Approval → First Session
1. Register with role `provider` → redirected to `/kyc` (blocking — cannot access dashboard fully until submitted).
2. Upload ID + certification docs (mock/placeholder upload at frontend-only stage) → status shows **Pending Review**.
3. Admin reviews in `/admin/providers/approve` → **Approve** → provider's `isApproved` flips true → notification sent to provider.
4. Provider can now set `/availability` slots and appears in customer discovery.
5. On a confirmed booking, provider sees it on `/provider/dashboard` → **Join Session** at scheduled time, same session screen pattern as customer side.

### 2.5 Admin: Approve Provider → Monitor Platform
1. `/admin/providers/approve` — list of pending providers, tap a row to expand KYC docs.
2. **Approve** or **Reject** (reject requires a reason, sent back to provider as notification).
3. `/admin/analytics` — glance at bookings/day, revenue, active providers; drill into `/admin/payouts` to batch-process provider earnings.
4. `/admin/moderation` — review flagged chat threads or reviews, take action (warn/suspend/dismiss).

### 2.6 E-Commerce: Browse → Buy
1. `/shop` → filter by category → tap product → detail view.
2. **Add to Cart** → `/shop/cart` → **Checkout** → address + payment (Razorpay) → `/shop/orders` shows new order with `pending` status, updates on webhook confirmation.

## 3. Navigation Shell Behavior
- Customer: bottom tab bar (Home / Bookings / Messages / Wallet / Profile) on mobile (< `lg:`), converts to a persistent left sidebar with the same 5 items at `lg:` and above.
- Provider: sidebar-first (dashboard is inherently a "desk" workflow), collapses to a hamburger menu on mobile.
- Admin: sidebar-only, desktop-first but must remain usable on mobile (hamburger collapse).

## 4. Empty & Error States (apply across all list/detail screens)
- No bookings yet → illustrated empty state + CTA to browse providers.
- No messages yet → empty state + CTA to book a session.
- Kundli match with missing birth data → inline validation, cannot submit until both profiles are complete.
- Any third-party API failure (Kundli vendor, payment, call SDK) → non-blocking error card with a **Retry** action, never a hard crash.
