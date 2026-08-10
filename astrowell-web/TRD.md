# Astrowell — Technical Requirements Document (TRD)

This is the blueprint your AI coding agent should default to for any technical decision. If a choice isn't covered here, prefer the option that keeps the MVP a monolith and defers complexity to the HLD phase (see §7).

## 1. Stack Summary

| Layer | Choice | Rationale |
|---|---|---|
| Frontend framework | Next.js 14 (App Router) + TypeScript | SSR/SEO for provider profiles, file-based routing maps cleanly to 3 personas via route groups |
| Styling | Tailwind CSS | Token-based design system, fast mobile-first iteration |
| State (client) | Zustand | Lighter than Redux for auth/wallet/chat session state |
| Icons | lucide-react | Single consistent icon set, already available in the design system |
| Backend framework | Node.js + Express | Matches existing developer experience (RentBridge), fast to scaffold modular REST APIs |
| Database | MongoDB Atlas + Mongoose | Flexible schema for varied provider categories and Kundli JSON payloads |
| Auth | JWT (access + refresh) + role-based route guards | Proven pattern from prior project; no need for third-party auth provider at MVP scale |
| Real-time messaging | Socket.io | Chat + call-signaling; simplest path to WebSocket rooms per conversation |
| Voice/Video calls | Agora (or Twilio Video as fallback) | Managed SFU — do not self-host media routing at MVP stage |
| Kundli/Matchmaking | Third-party Vedic Astrology API behind an internal adapter interface (see §4) | Avoid building ephemeris calculation in-house; adapter allows swapping vendors later |
| Media storage | Cloudinary | Provider photos, KYC docs, chat media, generated PDF reports |
| Payments | Razorpay | Standard for India-first launch; wallet recharge + course/product checkout |
| Geocoding | OpenCage (reused pattern from RentBridge) | Converts "place of birth" text to lat/lon/timezone for Kundli API calls |
| Background jobs | BullMQ + Redis | Reminders, PDF report generation, payout batching |
| Hosting (MVP) | Vercel (frontend) + Render/Railway (backend) + MongoDB Atlas | Zero-ops MVP hosting, matches prior deployment experience |

## 2. Architecture Pattern (MVP)
Monolithic Express API organized into feature modules (`src/modules/*`), each with its own `controller / service / routes / model`. No microservices at MVP — module boundaries are drawn intentionally so they *can* be extracted later without a rewrite (see §7).

```
Client (Next.js) → REST API (Express, JWT-guarded)
                  → Socket.io (chat, call signaling)
Express → MongoDB Atlas (Mongoose models)
        → Redis (BullMQ jobs, rate limiting)
        → External: Kundli API adapter, Agora/Twilio, Cloudinary, Razorpay, OpenCage
```

## 3. Auth & Roles
- Single `users` collection with a `role` enum: `customer | provider | admin`.
- JWT access token (short-lived) + refresh token (httpOnly cookie).
- Route protection: Next.js `middleware.ts` checks role on protected route groups; Express `roleGuard` middleware mirrors this server-side — **never trust the frontend role check alone**.
- Provider accounts require `isApproved: true` (admin-gated) before appearing in discovery or being bookable.

## 4. Kundli Integration — Technical Contract
- Define a `KundliProvider` interface with one method: `getMatch(birthA, birthB): Promise<NormalizedMatchResult>` and `getChart(birthProfile): Promise<NormalizedChart>`.
- Implement one adapter per vendor under `src/modules/kundli/adapters/` (e.g., `astrologyApiAdapter.js`, `prokeralaAdapter.js`). Only one is active at a time via `src/config/kundliProviders.js`.
- All responses are normalized into your own schema (see Backend Schema doc) before being cached or returned — never pass a vendor's raw response shape to the frontend.
- Cache every computed chart/match in MongoDB keyed by a hash of the birth data pair, to cut vendor API cost on repeat lookups.
- Geocode "place of birth" via OpenCage before calling the Kundli vendor (they require lat/lon/timezone, not free text).

## 5. Real-Time & Calls
- Socket.io namespace `/chat`: rooms keyed by `conversationId`; every message persisted to MongoDB on send (don't rely on the socket alone for durability).
- Socket.io namespace `/signaling`: used only to ring/accept/reject a call before handing off to the Agora/Twilio SDK, which owns the actual media stream.
- Per-minute billing: server-side interval on an active `consultations` document deducts from the customer's wallet every N seconds; emits a low-balance warning event; force-ends the session at zero balance.

## 6. Non-Functional Requirements
- Mobile-first responsive design (375px baseline → up to 1536px desktop), light + dark theme.
- All secrets (API keys for Kundli vendor, Agora, Razorpay, Cloudinary) live server-side only — never exposed to the Next.js client bundle.
- Rate-limit public/auth endpoints to prevent abuse (especially Kundli endpoints, which cost real money per call to the vendor).
- All external API calls (Kundli, payment, calls) must have a timeout + graceful error state on the frontend — never let a third-party outage hard-crash a screen.

## 7. HLD Growth Path (not built now, but design should not block it)
| MVP | Future |
|---|---|
| Express monolith | Split into auth / consultation / payment / kundli / notification services |
| 3rd-party Kundli API | Self-hosted `pyswisseph` (Swiss Ephemeris) microservice |
| Single Socket.io instance | Redis adapter for horizontal scaling |
| Single Mongo cluster | Read replicas / sharding |
| Vercel + Render | Containerized (Docker) on AWS ECS/EKS, CloudFront CDN, multi-AZ |

## 8. Current Build Status
- Frontend scaffold (Next.js + Tailwind tokens + mock data layer) — in progress via Antigravity, phased build (see Implementation Plan doc).
- Backend — not yet started; begins after frontend phases complete per current sequencing decision.
