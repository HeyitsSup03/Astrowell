# Astrowell — System Design Document
### LLD (MVP) with an HLD growth path — Astrology / Wellness Consultation Marketplace

Stack assumed (matches your existing skillset from RentBridge/Homie): **Next.js + React + Tailwind CSS** (frontend), **Node.js + Express + MongoDB Atlas** (backend), **JWT + role-based routing**, **Cloudinary** (media), deployable on **Vercel (frontend) + Render/Railway (backend)**.

---

## 1. Actors & Core Services

| Actor | Description |
|---|---|
| **Admin** | Platform owner (lead astrologer). Approves providers, manages payouts, moderates content, views platform-wide analytics. |
| **Service Provider** | Astrologer, Yoga Instructor, Dietitian, Tarot Reader etc. Sets availability, rates, runs sessions, uploads course content. |
| **Customer** | Books sessions, chats/calls, buys products/courses, requests kundli/matchmaking. |

**Services to support:** Appointment booking · AI Chatbot · Voice calls · Video calls · 1:1 Chat · Course video-conference batches · E-commerce (gemstones, pooja items, reports, courses).

---

## 2. The Kundli Matchmaking Problem — Recommended Approach

This is the part that stalls most clones, so treat it as its own subsystem, not a feature bolted onto "customer."

### 2.1 Don't build the ephemeris engine yourself (for MVP)
Accurate Vedic astrology requires precise planetary ephemeris calculations (Swiss Ephemeris), ayanamsa correction, and classical matching rules (Ashtakoot/Guna Milan across 8 kutas: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi). This is a solved problem exposed as APIs by several vendors — building it from scratch is weeks of niche domain work with real risk of getting it wrong (which erodes user trust immediately in this vertical).

**Recommended: integrate a third-party Vedic Astrology API behind your own backend service layer.** Realistic MVP options (compare pricing/limits before committing):
- **AstrologyAPI.com** — dedicated Kundli + Guna Milan + dosha + panchang endpoints, credit-based.
- **Prokerala Astrology API** — long-standing provider, popular for matrimony/kundli-matching integrations.
- **KundliAPI.com** — 200+ endpoints incl. Gun Milan, dosha, PDF report generation, and even "ground LLM answers in kundli data" for a chatbot — directly useful for your Chat Bot service.
- **RoxyAPI** — flat per-request pricing across Vedic + Western endpoints, good if you want predictable costs at scale.
- **Vedika** — free sandbox with mock data, good for building/testing your integration before paying for real credits.

Do **not** call these APIs from the frontend. Always proxy through your own Express route so the API key never leaves your server, so you can rate-limit/cache, and so you can swap providers later without touching the frontend contract.

### 2.2 Integration pattern

```
Customer/Provider Frontend
        │  (birth details only — name, dob, time, place)
        ▼
POST /api/kundli/match  (your Express API)
        │
        ├─► 1. Validate + geocode birth place → lat/lon/timezone (reuse your
        │      RentBridge OpenCage forward-geocoding logic — same exact need here)
        │
        ├─► 2. Hash(birthDataA + birthDataB) → check MatchResults cache in Mongo
        │      └─► HIT: return cached result instantly (saves API credits)
        │
        ├─► 3. MISS: call external Vedic Astrology API via a KundliProviderAdapter
        │      (an interface — e.g. AstrologyApiAdapter, ProkeralaAdapter — so the
        │       provider is swappable behind one contract)
        │
        ├─► 4. Normalize response into YOUR schema (see 2.3) regardless of vendor
        │
        └─► 5. Cache in Mongo + return to client
```

Why the adapter pattern matters: vendors change pricing/uptime. If `KundliProvider` is an interface with one `getMatch(birthA, birthB)` method, swapping vendors later means writing one new adapter class — zero frontend changes, zero schema migration.

### 2.3 Data model for Kundli

```js
// BirthProfile — reusable, a customer can store multiple (self, partner, family)
{
  _id, userId,
  label: "Self" | "Partner" | "Child" ...,
  name, gender,
  dob, tob,                     // date & time of birth
  placeOfBirth: { text, lat, lon, timezone },
  createdAt
}

// KundliReport — cached natal chart for one BirthProfile
{
  _id, birthProfileId,
  provider: "astrologyapi" | "prokerala" | "roxyapi",
  rawResponse: {...},           // vendor's raw payload, kept for audit/debug
  chart: {                      // normalized shape your UI actually renders
    ascendant, moonSign, sunSign, nakshatra,
    planets: [{ name, sign, house, degree, retrograde }],
    dashas: [{ planet, start, end }],
    doshas: { manglik: bool, kalsarpa: bool, ... }
  },
  computedAt
}

// MatchResult — cached compatibility between two BirthProfiles
{
  _id, requestedBy: userId,
  birthProfileA, birthProfileB,
  cacheKey: hash(A+B),          // for instant cache hits on repeat checks
  provider,
  gunMilan: {
    totalScore: 0-36,
    kutas: [{ name: "Varna"|"Vashya"|"Tara"|"Yoni"|"GrahaMaitri"|"Gana"|"Bhakoot"|"Nadi",
               score, maxScore, description }],
  },
  doshaFlags: { manglikA, manglikB, nadiDosha, bhakootDosha },
  verdict: "Excellent" | "Good" | "Average" | "Not Recommended",
  reportPdfUrl,                 // generated report, stored on Cloudinary
  createdAt
}
```

### 2.4 Chatbot synergy
Several Kundli APIs explicitly support "grounding" — meaning you pass the computed chart JSON as context into an LLM prompt so the chatbot gives kundli-aware answers instead of generic astrology text. That's a strong differentiator for your Chat Bot service and reuses data you've already cached — implement it as: `chatbot receives userId → fetch their latest KundliReport → inject into system prompt → answer`.

### 2.5 Future HLD path for this subsystem
Once you have consistent volume and revenue: extract this into a dedicated **Kundli Microservice** (Python + `pyswisseph`, self-hosted Swiss Ephemeris) so you own the calculation, cut third-party API cost, and can add proprietary features (custom dosha rules, regional matching styles like Dashakoot for South Indian users vs Ashtakoot for North Indian users). Keep the same normalized response contract from 2.3 so nothing above it (frontend, chatbot, PDF generator) needs to change.

---

## 3. LLD — MongoDB Collections (MVP)

| Collection | Purpose | Key fields |
|---|---|---|
| `users` | Base identity for all 3 roles | role: customer/provider/admin, email, phone, passwordHash, avatar, isVerified |
| `providerProfiles` | Extends user for providers | category: astrologer/yoga/dietitian, bio, languages, skills[], ratePerMin, kycDocs[], availabilitySlots[], rating, isApproved (admin gate) |
| `birthProfiles` | Reusable birth data | see §2.3 |
| `kundliReports` | Cached natal charts | see §2.3 |
| `matchResults` | Cached compatibility | see §2.3 |
| `appointments` | Scheduled bookings | customerId, providerId, serviceType (chat/call/video), slotStart, slotEnd, status |
| `consultations` | Live/completed session log | appointmentId or adhoc, mode, startedAt, endedAt, durationSec, costDeducted, transcriptRef, recordingUrl |
| `wallets` | Coin/wallet balance | userId, balance, currency |
| `transactions` | Wallet ledger | userId, type: recharge/deduction/payout, amount, refId, status |
| `messages` | Chat threads | conversationId, senderId, text/mediaUrl, readAt |
| `courses` | Course catalog | providerId, title, syllabus, price, schedule[], meetingLink |
| `courseEnrollments` | Who's enrolled | courseId, userId, paymentRef, progress |
| `products` | E-commerce catalog | name, category, price, stock, images[], providerId (optional, if provider-sold) |
| `orders` | E-commerce orders | userId, items[], totalAmount, shippingAddress, paymentStatus, orderStatus |
| `reviews` | Ratings | targetType: provider/course/product, targetId, rating, comment |
| `notifications` | In-app/push | userId, type, payload, isRead |

---

## 4. Backend Flow (API Layout)

```
/api/auth            → register, login, refresh, role-based guard middleware
/api/users            → profile CRUD
/api/providers         → listing, filters (category, language, rating, price), approval (admin)
/api/birth-profiles    → CRUD for a user's saved birth details
/api/kundli/report      → generate/fetch natal chart (proxy → adapter → cache)
/api/kundli/match       → generate/fetch compatibility (proxy → adapter → cache)
/api/appointments       → book, reschedule, cancel; availability calendar
/api/consultations      → start/end session, billing hook (per-minute deduction)
/api/chat               → Socket.io namespace: /chat  (rooms per conversationId)
/api/calls              → Socket.io namespace: /signaling (WebRTC/Agora token issuance)
/api/wallet              → recharge (payment gateway webhook), balance, ledger
/api/courses             → CRUD, enrollment, VC meeting link generation
/api/products & /api/orders → catalog, cart, checkout, payment webhook
/api/reviews             → post-consultation & post-purchase reviews
/api/admin               → provider approval, payouts, moderation, analytics
```

### 4.1 Real-time layer
- **Chat**: Socket.io namespace with rooms keyed by `conversationId`; persist every message to `messages` collection on send (don't rely on socket delivery alone).
- **Voice/Video calls**: Don't build your own SFU/media server. Use **Agora** or **Twilio Video** (or 100ms) — your Express backend only issues short-lived tokens; the SDK handles the actual media routing. Socket.io is used purely for call-signaling (ringing, accept/reject) before handing off to the SDK.
- **Per-minute billing** (Astrotalk's actual model): on `consultation:start`, lock a minimum wallet balance; a server-side timer emits a tick every N seconds deducting from `wallets`/`transactions`; on low balance emit a warning event to the client; on zero balance, force-end the session.

### 4.2 Chatbot flow
```
User message → /api/chat/bot
   → simple intent match (FAQ, "how to book", "pricing") → canned response
   → else → escalate: fetch user's latest KundliReport (if exists) →
      inject as context into LLM call (Claude/OpenAI) → grounded answer
   → else (LLM low-confidence) → offer to connect with live provider (deep link into /appointments)
```

### 4.3 Appointment flow
```
Customer picks provider → sees availabilitySlots (computed from
providerProfile.availabilitySlots minus existing appointments) → selects slot
→ wallet balance check → creates `appointments` doc (status: pending)
→ notification to provider → provider accepts (status: confirmed)
→ reminder notifications (T-24h, T-1h) → session start on scheduled time
→ on completion: `consultations` doc created, wallet debited, review prompt sent
```

---

## 5. Folder Structure

### Frontend (Next.js, App Router)
```
astrowell-web/
├─ app/
│  ├─ (customer)/
│  │  ├─ dashboard/
│  │  ├─ providers/[id]/
│  │  ├─ kundli/
│  │  │  ├─ generate/page.tsx
│  │  │  └─ match/page.tsx
│  │  ├─ appointments/
│  │  ├─ chat/[conversationId]/
│  │  ├─ call/[sessionId]/
│  │  ├─ courses/[id]/
│  │  └─ shop/ [cart, checkout, orders]
│  ├─ (provider)/
│  │  ├─ dashboard/           // earnings, upcoming sessions
│  │  ├─ availability/
│  │  ├─ courses/manage/
│  │  └─ kyc/
│  ├─ (admin)/
│  │  ├─ providers/approve/
│  │  ├─ payouts/
│  │  ├─ moderation/
│  │  └─ analytics/
│  ├─ (auth)/login /register
│  └─ layout.tsx, page.tsx (landing)
├─ components/
│  ├─ ui/            // Button, Card, Modal, Input — design-system primitives
│  ├─ kundli/         // BirthForm, ChartWheel, GunMilanScoreCard, DoshaBadge
│  ├─ chat/, call/, appointments/, shop/, provider-card/
├─ lib/
│  ├─ api/            // typed fetch wrappers per module (kundli.ts, wallet.ts…)
│  ├─ socket.ts
│  ├─ webrtc.ts        // Agora/Twilio client init
│  └─ auth.ts          // JWT handling, role guard hooks
├─ store/              // Zustand slices: auth, wallet, chatSession
├─ styles/globals.css, tailwind.config.ts
└─ middleware.ts        // route protection by role
```

### Backend (Express)
```
astrowell-api/
├─ src/
│  ├─ modules/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ providers/
│  │  ├─ birthProfiles/
│  │  ├─ kundli/
│  │  │  ├─ adapters/ (astrologyApiAdapter.js, prokeralaAdapter.js)
│  │  │  ├─ kundli.service.js   // caching + orchestration
│  │  │  ├─ kundli.controller.js
│  │  │  └─ kundli.routes.js
│  │  ├─ appointments/
│  │  ├─ consultations/       // billing tick logic here
│  │  ├─ wallet/
│  │  ├─ chat/                // socket handlers
│  │  ├─ calls/               // Agora/Twilio token issuance
│  │  ├─ courses/
│  │  ├─ shop/ (products, orders, cart)
│  │  ├─ reviews/
│  │  └─ admin/
│  ├─ middleware/ (authGuard, roleGuard, rateLimiter, errorHandler)
│  ├─ jobs/          // BullMQ: reminders, report-PDF generation, payout batch
│  ├─ sockets/        // io.of('/chat'), io.of('/signaling')
│  ├─ config/ (db.js, cloudinary.js, payment.js, kundliProviders.js)
│  └─ app.js, server.js
```

---

## 6. UI System — Mobile-First, Consistent Across Personas

### 6.1 Color palette
Astrology/wellness platforms lean on trust + warmth + a touch of mysticism. Suggested tokens (put these directly in `tailwind.config.ts` as `theme.extend.colors`):

| Token | Hex | Use |
|---|---|---|
| `primary` (deep indigo) | `#2E1A47` | Headers, nav, primary buttons |
| `primary-light` | `#4B2E83` | Hover states, gradients |
| `accent` (gold) | `#D4A24C` | CTAs, badges, star ratings, "premium" markers |
| `secondary` (maroon) | `#7A1F3D` | Provider category tags, alerts |
| `background` | `#FDF8F0` | Warm cream base, not stark white |
| `surface` | `#FFFFFF` | Cards |
| `text-primary` | `#1F1B24` | Body copy |
| `text-muted` | `#6B6470` | Secondary text |
| `success` | `#3E8E5A` | Confirmed bookings, online status |
| `danger` | `#C0392B` | Errors, low-wallet warnings |

### 6.2 Typography
- **Display/headings**: `Cormorant Garamond` or `Playfair Display` (serif, gives the "astrology/heritage" feel) — use only for H1/H2 and hero sections, not body text.
- **Body/UI**: `Inter` or `Poppins` — clean, highly legible at small mobile sizes.
- Scale: base 16px mobile → 18px desktop body; headings scale via `clamp()` so they don't need separate mobile/desktop overrides.

### 6.3 Breakpoints (Tailwind defaults are fine — don't reinvent)
`sm:640px · md:768px · lg:1024px · xl:1280px · 2xl:1536px`
Design every screen at 375px width first (iPhone SE baseline), then add `md:`/`lg:` overrides. Big-screen rule: cap main content width at `max-w-6xl mx-auto` so text/cards don't stretch edge-to-edge on desktop — use the extra space for a persistent sidebar (provider filters, wallet widget) rather than wider text blocks.

### 6.4 Consistency mechanism
Build a small `components/ui/` primitive set once (Button, Card, Badge, Avatar, Modal, Input, Tabs) styled with the tokens above, and **only** use these primitives across all 3 interfaces. This is what actually keeps admin/provider/customer visually consistent — not remembering hex codes per page.

### 6.5 Key mobile screens per persona
- **Customer**: Home (provider carousel, daily horoscope card, quick-kundli CTA) → Provider profile (rate, reviews, "Chat/Call/Video" sticky bottom bar) → Kundli Match (2-step form: your details, partner details → animated score reveal) → Wallet → Bookings.
- **Provider**: Dashboard (today's sessions, earnings widget) → Availability calendar → Live session screen (timer + wallet-remaining indicator for the customer, visible to provider too) → Course manager.
- **Admin**: Approval queue (KYC) → Payout batch → Moderation (flagged chats/reviews) → Analytics (bookings/day, revenue, top providers).

---

## 7. MVP Scope vs. HLD Growth Path

| Layer | MVP (now) | HLD (when you scale) |
|---|---|---|
| Compute | Single Express monolith | Split into services: auth, consultation, payment, kundli, notification |
| Kundli | 3rd-party API + Mongo cache | Self-hosted `pyswisseph` microservice |
| Real-time | Single Socket.io instance | Redis adapter for Socket.io horizontal scaling |
| Calls | Agora/Twilio managed SDK | Same (rarely worth self-hosting SFU) |
| DB | Single MongoDB Atlas cluster | Read replicas, sharding by region/userId |
| Jobs | BullMQ on same box | Dedicated worker pool, Kafka/RabbitMQ for events |
| Media | Cloudinary | Cloudinary + CDN edge caching (CloudFront), matches what Astrotalk actually runs |
| Hosting | Vercel + Render | Containerized (Docker) on AWS ECS/EKS, auto-scaling groups, multi-AZ |

---

## 8. Suggested Build Order (solo dev)

1. Auth + role-based routing (you already have this pattern from RentBridge)
2. Provider profiles + listing/filter
3. Wallet + payment gateway integration (Razorpay is standard for India)
4. Appointments (booking + calendar)
5. Chat (Socket.io + persisted messages)
6. **Kundli report + matchmaking** (adapter pattern from §2 — build this once wallet/auth exist so you can gate it behind payment)
7. Voice/video calls (Agora integration)
8. Chatbot (FAQ first, LLM-grounded later)
9. Courses + VC meetings
10. E-commerce (products/orders) — build last, it's the most "standard CRUD" piece and least differentiated

---

## Sources referenced
- AppSquadz, "Astrotalk – AI & AWS Cloud Consulting" (AWS architecture: CloudFront, Auto Scaling, Multi-AZ)
- Miracuves, "Build an App Like Astrotalk – Full-Stack Developer Guide" (core table structure)
- Miracuves, "Business Model of Astrotalk" (marketplace model, API-ready architecture)
- AstrologyAPI.com, Prokerala, KundliAPI.com, Vedika, RoxyAPI — Vedic Astrology / Kundli-matching API documentation