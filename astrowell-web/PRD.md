# Astrowell — Product Requirements Document (PRD)

## 1. Vision
Astrowell is a two-sided marketplace connecting people seeking astrology, yoga, and wellness guidance with verified service providers — through appointments, chat, calls, video, group courses, and a Vedic Kundli/matchmaking engine — plus an e-commerce layer for related products. Mobile-first, responsive to desktop.

## 2. Target Users (3 interfaces)

### 2.1 Customer
Someone seeking guidance — astrology reading, yoga instruction, diet consultation, or Kundli matching for marriage/relationship compatibility. Wants: fast provider discovery, transparent pricing, trustworthy compatibility results, flexible ways to connect (chat/call/video), and a simple wallet-based payment experience.

### 2.2 Service Provider
Astrologer, Yoga Instructor, Dietitian, or similar. Wants: control over availability and rates, a clean session workflow, visibility into earnings, and tools to run courses/batches.

### 2.3 Admin (platform owner / lead astrologer)
Wants: control over who is allowed to sell on the platform (KYC approval), visibility into platform health (bookings, revenue, disputes), and moderation tools.

## 3. Feature List (MVP scope)

### 3.1 Core Marketplace
- Provider discovery: browse/search/filter by category, language, rating, price, online status
- Provider profile pages: bio, experience, rate/min, reviews
- Appointment booking: slot selection, confirmation, reschedule/cancel
- Reviews & ratings post-session

### 3.2 Communication Services
- **Chat** — 1:1 text messaging, persisted history
- **Chat Bot** — FAQ-first automated assistant; escalates to LLM-grounded answers using the customer's own Kundli data when relevant; falls back to connecting with a live provider
- **Phone (voice) calls** — in-app calling, no external number exposed
- **Video calls** — 1:1 consultation video sessions
- **Course Video Conference** — scheduled group sessions for enrolled course batches

### 3.3 Kundli & Matchmaking (core differentiator)
- Save multiple Birth Profiles (self, partner, family) with name/DOB/TOB/place of birth
- Generate individual Kundli (natal chart): ascendant, planets, nakshatra, dashas, dosha flags
- Kundli Matching (Guna Milan / Ashtakoot): 36-point score across 8 kutas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi), dosha checks (Manglik, Nadi), overall compatibility verdict
- Downloadable/shareable compatibility report (PDF)
- Repeat-match caching so re-checking the same pair is instant

### 3.4 Wallet & Payments
- Wallet balance, recharge, transaction history
- Per-minute billing during live chat/call/video sessions (deduct live, warn on low balance, auto-end at zero)
- Provider payouts (admin-managed)

### 3.5 Courses
- Provider-created course listings with schedule and price
- Customer enrollment + payment
- Video-conference batch sessions tied to a course

### 3.6 E-Commerce
- Product catalog (gemstones, pooja items, printed reports, merchandise)
- Cart, checkout, order history
- Order status tracking

### 3.7 Provider Operations
- Availability management (weekly slot grid)
- KYC document submission and approval status
- Earnings dashboard
- Course management (create/edit/schedule)

### 3.8 Admin Operations
- Provider approval queue (KYC review, approve/reject)
- Payout batch processing
- Content/chat moderation (flagged conversations, reviews)
- Platform analytics: bookings/day, revenue, active providers, top performers

### 3.9 Platform-wide
- Role-based auth (Customer / Provider / Admin) with a single account system
- Notifications (booking confirmations, reminders, low-wallet alerts, chat messages)
- Light/dark theme support

## 4. Out of Scope for MVP
- Self-hosted astrology calculation engine (use third-party Vedic Astrology API; revisit at scale — see TRD)
- Multi-currency / international payments
- Native mobile apps (responsive web only for MVP)
- Advanced AI astrologer (only FAQ + Kundli-grounded LLM chatbot at MVP stage)
- Multi-language UI localization (English + Hindi content only if time permits, not a hard requirement)

## 5. Success Signals (informal, MVP stage)
- A customer can go from landing page → provider discovery → booking → paid session without dead ends
- A customer can generate a Kundli and run a match end-to-end using mock/real data
- A provider can manage availability and see an upcoming session
- An admin can approve a provider and see them appear live in discovery
