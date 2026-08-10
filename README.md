# Astrowell 🔮✨

> **Astrowell** is a modern, full-stack **Vedic Astrology & Holistic Wellness Consultation Marketplace**. It connects customers with certified astrologers, tarot readers, numerologists, and wellness experts for live consultations, kundli matchmaking, e-commerce, and learning courses.

---

## 🌟 Application Overview

Astrowell bridges traditional Vedic astrology with a high-performance, real-time digital platform. Built with a 3-actor ecosystem (**Customer**, **Service Provider / Astrologer**, and **Admin**), Astrowell provides an all-in-one platform for personal growth, spiritual guidance, and wellness services.

### Key Use Cases & Capabilities

1. **Astrologer & Expert Directory**: Filter and discover top-rated astrologers and wellness experts by rating, language, specialty, and pricing.
2. **Real-time 1:1 Consultations**: Instant text chat and high-quality WebRTC audio/video consultations with real-time billing and session management.
3. **Kundli & Matchmaking Engine**: Generate detailed Vedic birth charts (Kundli) and run Ashtakoot Guna Milan (36-point matching) with dosha analysis (Manglik, Kalsarpa).
4. **Spiritual E-Commerce Marketplace**: Browse and purchase energized gemstones, pooja items, rudrakshas, and custom astrology reports.
5. **Astrowell Academy**: Enroll in live and recorded courses hosted by verified instructors on Vedic astrology, tarot reading, and palmistry.
6. **In-App Digital Wallet**: Seamless top-ups, minute-based session deductions, transaction history, and instant provider payouts.

---

## 🏗️ System Architecture & Stack

### Frontend (`astrowell-web`)
* **Framework**: Next.js 15 (App Router with Server & Client Components)
* **Styling & UI**: Tailwind CSS, Dark/Light Mode with CSS variables, Lucide React icons
* **State Management**: Zustand stores (`authStore`, `chatSessionStore`, `walletStore`)
* **Real-time & Media**: WebRTC for Audio/Video calls, Socket.io client for chat and signaling
* **Language**: TypeScript

### Backend (`astrowell-api`)
* **Runtime**: Node.js & Express.js (Modular Monolith / Microservices layout)
* **Database**: MongoDB Atlas with Mongoose ORM
* **Real-Time Engines**: Socket.io servers for 1:1 Chat (`chat.socket.js`) and WebRTC Signaling (`signaling.socket.js`)
* **Security & Auth**: JWT authentication, Role-Based Access Control (RBAC)
* **Integrations**: Geocoding (OpenCage API) and Vedic Ephemeris API Adapter pattern (AstrologyAPI / Prokerala / RoxyAPI proxy)

---

## ✨ Features Implemented So Far

### 📱 1. Customer Web Application (`/astrowell-web/app/(customer)`)
- **Landing & Discovery Page (`/`)**: Hero section, featured astrologers, horoscope widgets, quick action tiles, testimonials.
- **Astrologer Profiles & Booking (`/providers/[id]`, `/appointments`)**: View detailed bio, customer reviews, pricing per minute, slot selection modal, and appointment booking workflow.
- **Live 1:1 Chat Console (`/chat/[conversationId]`)**: Real-time messaging UI, session timers, rate counters, quick attachments, and mock live responses.
- **Audio & Video Call Room (`/call/[sessionId]`)**: WebRTC audio/video consultation interface with mic/camera controls, screen share, and live duration tracker.
- **Kundli Birth Chart Generator (`/kundli/generate`)**: Interactive birth details form (Name, DOB, Time, Location) with natal chart visualization and dosha indicators.
- **Ashtakoot Guna Milan Matchmaker (`/kundli/match`)**: Partner birth details entry, score breakdown out of 36 points, Ashtakoot kutas table, and compatibility verdict.
- **Spiritual E-Commerce (`/shop`, `/shop/cart`, `/shop/checkout`, `/shop/orders`)**: Product catalog, category filters, cart management, checkout with wallet payment, and order tracking.
- **Astrology Academy (`/courses`, `/courses/[id]`)**: Course listings, instructor details, curriculum overview, enrollment flow.
- **Digital Wallet (`/wallet`)**: Live balance summary, recharge packs (+ ₹100, ₹500, ₹1000, ₹2000), transaction history log.

### 🧘 2. Provider Management Portal (`/astrowell-web/app/(provider)`)
- **Provider Dashboard (`/provider/dashboard`)**: Earnings metrics, total consultation minutes, pending appointments, upcoming session queue.
- **KYC Verification (`/provider/kyc`)**: Government ID upload, certification proof, profile approval status.
- **Slot Availability Manager (`/provider/availability`)**: Set weekly schedules, custom date overrides, per-minute consultation rates.
- **Course Manager (`/provider/courses/manage`)**: Create and update course offerings and batches.

### 🛡️ 3. Admin Control Center (`/astrowell-web/app/(admin)`)
- **Provider Verification (`/admin/providers/approve`)**: Review pending provider KYC applications, approve/reject astrologers.
- **Platform Moderation (`/admin/moderation`)**: Flagged chat monitoring, dispute resolution logs.
- **Payout Management (`/admin/payouts`)**: Process provider withdrawal requests and track platform commission splits.
- **Platform Analytics (`/admin/analytics`)**: GMV, active users, session volumes, top performing categories.

### ⚙️ 4. Backend Service Core (`/astrowell-api`)
- Modular architecture with clean Separation of Concerns (Controllers, Services, Routes, Models):
  - `auth`, `users`, `providers`, `appointments`, `kundli`, `chat`, `shop`, `wallet`
- Socket.io event dispatchers for real-time messaging and peer-to-peer signaling.
- Ephemeris proxy adapter architecture to securely wrap third-party Vedic Kundli APIs.

---

## 📁 Repository Directory Structure

```text
Astrowell/
├── README.md                      # System documentation & setup guide
├── flow.md                        # Complete HLD/LLD & system architecture specification
├── .gitignore                     # Root Git ignore rule set
│
├── astrowell-web/                 # Next.js 15 App Router Frontend
│   ├── app/
│   │   ├── (admin)/               # Admin portal pages
│   │   ├── (auth)/                # Login & Registration flows
│   │   ├── (customer)/            # Customer web application pages
│   │   ├── (provider)/            # Provider dashboard pages
│   │   └── layout.tsx             # Root Layout with Theme Provider
│   ├── components/
│   │   ├── appointments/          # Slot picker & booking modals
│   │   ├── kundli/                # Chart wheel, birth form, score cards
│   │   ├── layout/                # Navbar, Sidebar, Bottom Navigation, Theme Toggle
│   │   ├── provider-card/         # Astrologer profile card component
│   │   └── ui/                    # Reusable UI primitives (Button, Card, Modal, Avatar, etc.)
│   ├── lib/
│   │   ├── api/                   # API service clients
│   │   ├── mocks/                 # Comprehensive mock data for offline preview
│   │   ├── store/                 # Zustand state stores (Auth, Chat, Wallet)
│   │   ├── socket.ts              # Socket.io connection helper
│   │   └── webrtc.ts              # PeerConnection helper
│   ├── public/                    # Static assets & branding imagery
│   ├── styles/                    # Global CSS & Tailwind rules
│   └── package.json
│
└── astrowell-api/                 # Node.js + Express Backend API
    ├── src/
    │   ├── modules/               # Domain-driven feature modules
    │   │   ├── appointments/
    │   │   ├── auth/
    │   │   ├── chat/
    │   │   ├── kundli/
    │   │   ├── providers/
    │   │   ├── shop/
    │   │   ├── users/
    │   │   └── wallet/
    │   ├── sockets/               # Chat socket & WebRTC signaling socket handlers
    │   ├── utils/                 # Geocoder, Hash, Logger, Response helpers
    │   └── server.js              # Express app bootstrap
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or later
- **npm** or **yarn**

### 1. Running the Frontend (`astrowell-web`)

```bash
cd astrowell-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the interactive application.

### 2. Running the Backend API (`astrowell-api`)

```bash
cd astrowell-api
npm install
npm run dev
```

The API server will launch on [http://localhost:5000](http://localhost:5000).

---

## 📌 Next Steps & Roadmap

- [ ] Connect `astrowell-web` service layer directly to `astrowell-api` endpoints.
- [ ] Integrate external Vedic ephemeris API provider (e.g. AstrologyAPI or Prokerala).
- [ ] Integrate Payment Gateway (Razorpay/Stripe) for real money wallet recharges.
- [ ] Add Cloudinary media upload integration for provider KYC and store product images.

---

## 📄 License

This project is licensed under the MIT License.
