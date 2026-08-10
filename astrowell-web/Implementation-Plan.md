# Astrowell — Implementation Plan

Step-by-step build sequence. Frontend is built first (mock data), backend second, then integration replaces mocks with real endpoints. Each stage should be reviewed before moving to the next — do not batch multiple stages into one agent session.

## Stage A — Frontend Foundation (mock data) ✅ IN PROGRESS
Status: Prompt 0 (master context) and Prompt 1 (foundation) executed.

- [x] A0. Master context set: design tokens, folder contract, mock-data architecture rules
- [x] A1. Next.js scaffold, `components/ui/` primitives, mock data layer, `lib/api/*` wrappers
- [ ] A2. Customer discovery: landing page, dashboard, provider profile, responsive nav shell
- [ ] A3. Kundli generate + match screens (core differentiator — extra polish)
- [ ] A4. Appointments, chat, wallet screens
- [ ] A5. Provider + Admin shells
- [ ] A6. Cross-screen polish pass: token compliance, dark mode, empty/error states, 404/loading

(A2–A6 correspond to Prompts 2–6 in the Antigravity Prompt Pack.)

## Stage B — Backend Foundation
Do not start until Stage A is functionally complete end-to-end on mock data (so the frontend's expected API shape is proven out by real usage, not just theory).

- [ ] B1. Express scaffold: `src/app.js`, `src/server.js`, DB connection (`src/config/db.js`), error handler + auth/role middleware
- [ ] B2. `users` + `auth` modules: register/login/refresh, JWT issuance, role guard
- [ ] B3. `providerProfiles` module: CRUD, discovery filtering query, admin approval endpoint
- [ ] B4. `birthProfiles` + `kundli` modules: adapter interface, one vendor adapter wired up (start with whichever has the best free sandbox — Vedika or a Prokerala trial), caching layer, geocoding integration (OpenCage)
- [ ] B5. `appointments` + `consultations` modules: booking CRUD, slot availability calculation, per-minute billing tick logic
- [ ] B6. `wallet` module: balance, transactions, Razorpay webhook handling
- [ ] B7. `chat` module + Socket.io `/chat` namespace: message persistence, room-per-conversation
- [ ] B8. `calls` module + Socket.io `/signaling` namespace: Agora/Twilio token issuance, ring/accept/reject signaling
- [ ] B9. `courses`, `shop` (products/orders/cart), `reviews` modules: standard CRUD
- [ ] B10. `admin` module: approval queue, payout batch, moderation, analytics aggregation queries
- [ ] B11. `notifications` module + background jobs (BullMQ): reminders, PDF report generation, payout batching

## Stage C — Integration (swap mock → real)
The mock-first architecture means this stage should only touch `lib/api/*.ts` files on the frontend, not components/pages.

- [ ] C1. Point `lib/api/auth.ts`, `lib/api/providers.ts` etc. at real Express endpoints one module at a time; verify each screen still renders correctly against real data before moving to the next module
- [ ] C2. Replace chat's simulated-delay replies with real Socket.io connection
- [ ] C3. Wire real Agora/Twilio call SDK into the call screens (replace any placeholder call UI)
- [ ] C4. Replace mock wallet "Add Money" with real Razorpay checkout flow
- [ ] C5. Replace mock Kundli results with real adapter-backed API calls; verify caching actually prevents duplicate vendor calls
- [ ] C6. End-to-end auth: real JWT issued from backend, middleware.ts route protection tested per role

## Stage D — Hardening & Launch Prep
- [ ] D1. Rate limiting on public + Kundli endpoints
- [ ] D2. Error boundaries + retry UI verified against real third-party outages (simulate a Kundli API timeout, a failed payment webhook)
- [ ] D3. Basic automated tests: auth flow, booking flow, Kundli match caching behavior
- [ ] D4. Accessibility pass: focus states, contrast check on gradient sections, non-color status indicators
- [ ] D5. Deploy: frontend → Vercel, backend → Render/Railway, MongoDB Atlas production cluster, environment variables audited (no secrets in frontend bundle)
- [ ] D6. Seed production DB with real provider onboarding (at least a few real/admin-approved providers before public launch)

## Stage E — Post-MVP (HLD growth path — not built now)
Reference: TRD §7. Only revisit when real usage data justifies the added complexity — extracting services, self-hosting Kundli calculation, horizontal scaling of Socket.io, containerized deployment.

---
### Working Notes
- Current position: Stage A, about to run Prompt 2 (customer discovery screens).
- Keep this file updated by checking off items as they're completed — it's the single source of truth for "what's actually done" across sessions with the AI agent.
