# Astrowell — Backend Schema Document

MongoDB + Mongoose. Each collection below lists fields, types, and relationships. `ref` indicates a Mongoose ObjectId reference.

## users
```
_id, role: enum('customer','provider','admin'),
name, email (unique, indexed), phone, passwordHash,
avatarUrl, isVerified: bool, createdAt, updatedAt
```

## providerProfiles
```
_id, userId: ref(users) [unique, indexed],
category: enum('astrologer','yoga','dietitian','other'),
bio, languages: [String], experienceYears,
ratePerMin: Number,
kycDocs: [{ url, type, status: enum('pending','approved','rejected') }],
availabilitySlots: [{ dayOfWeek, startTime, endTime }],
rating: Number (denormalized avg), reviewCount: Number,
isApproved: bool (admin gate), isOnline: bool,
createdAt, updatedAt
```
Index: `{ category: 1, isApproved: 1, isOnline: 1 }` for discovery filtering.

## birthProfiles
```
_id, userId: ref(users) [indexed],
label: String ("Self","Partner","Child"...),
name, gender,
dob: Date, tob: String (HH:mm),
placeOfBirth: { text, lat: Number, lon: Number, timezone: Number },
createdAt
```

## kundliReports
```
_id, birthProfileId: ref(birthProfiles) [indexed],
provider: enum('astrologyapi','prokerala','roxyapi',...),
rawResponse: Mixed,           // vendor payload, kept for audit
chart: {
  ascendant, moonSign, sunSign, nakshatra,
  planets: [{ name, sign, house, degree, retrograde: bool }],
  dashas: [{ planet, start: Date, end: Date }],
  doshas: { manglik: bool, kalsarpa: bool, ... }
},
computedAt
```
Index: `{ birthProfileId: 1 }`.

## matchResults
```
_id, requestedBy: ref(users),
birthProfileA: ref(birthProfiles), birthProfileB: ref(birthProfiles),
cacheKey: String [unique, indexed],   // hash(birthDataA + birthDataB)
provider: String,
gunMilan: {
  totalScore: Number (0-36),
  kutas: [{ name: enum('Varna','Vashya','Tara','Yoni','GrahaMaitri','Gana','Bhakoot','Nadi'),
            score: Number, maxScore: Number, description: String }]
},
doshaFlags: { manglikA: bool, manglikB: bool, nadiDosha: bool, bhakootDosha: bool },
verdict: enum('Excellent','Good','Average','Not Recommended'),
reportPdfUrl: String,
createdAt
```

## appointments
```
_id, customerId: ref(users), providerId: ref(users),
serviceType: enum('chat','call','video'),
slotStart: Date, slotEnd: Date,
status: enum('pending','confirmed','completed','cancelled'),
createdAt, updatedAt
```
Index: `{ providerId: 1, slotStart: 1 }`, `{ customerId: 1, status: 1 }`.

## consultations
```
_id, appointmentId: ref(appointments) [optional, null if ad-hoc],
customerId: ref(users), providerId: ref(users),
mode: enum('chat','call','video'),
startedAt: Date, endedAt: Date, durationSec: Number,
costDeducted: Number,
transcriptRef: String (optional), recordingUrl: String (optional),
createdAt
```

## wallets
```
_id, userId: ref(users) [unique, indexed],
balance: Number, currency: String (default 'INR')
```

## transactions
```
_id, userId: ref(users) [indexed],
type: enum('recharge','deduction','payout','refund'),
amount: Number, refId: String (payment gateway / consultation ref),
status: enum('pending','success','failed'),
description: String, createdAt
```

## messages
```
_id, conversationId: String [indexed],
senderId: ref(users), text: String, mediaUrl: String (optional),
sentAt: Date, readAt: Date (optional)
```

## courses
```
_id, providerId: ref(users),
title, description, syllabus: [String],
price: Number,
schedule: [{ date: Date, startTime, endTime, meetingLink }],
enrolledCount: Number, createdAt, updatedAt
```

## courseEnrollments
```
_id, courseId: ref(courses), userId: ref(users),
paymentRef: String, progress: Number, enrolledAt: Date
```

## products
```
_id, name, category, price: Number, stock: Number,
images: [String], providerId: ref(users) (optional),
createdAt, updatedAt
```

## orders
```
_id, userId: ref(users),
items: [{ productId: ref(products), qty: Number, priceAtOrder: Number }],
totalAmount: Number,
shippingAddress: { line1, city, state, pincode, phone },
paymentStatus: enum('pending','paid','failed','refunded'),
orderStatus: enum('placed','shipped','delivered','cancelled'),
createdAt, updatedAt
```

## reviews
```
_id, targetType: enum('provider','course','product'),
targetId: ObjectId, authorId: ref(users),
rating: Number (1-5), comment: String, createdAt
```

## notifications
```
_id, userId: ref(users) [indexed],
type: enum('booking','reminder','wallet','chat','system'),
payload: Mixed, isRead: bool, createdAt
```

## Relationships Summary
- `users` (1) → (0..1) `providerProfiles` — only if role is provider
- `users` (1) → (many) `birthProfiles` → (1) `kundliReports`
- `birthProfiles` (2, A+B) → `matchResults`
- `users` (customer) + `users` (provider) → `appointments` → `consultations`
- `users` (1) → (1) `wallets` → (many) `transactions`
- `users` (provider) → (many) `courses` → (many) `courseEnrollments`
- `users` (1) → (many) `orders` containing `products`

## Indexing Priorities (MVP)
1. `providerProfiles`: category + isApproved + isOnline (discovery is the highest-traffic query)
2. `matchResults`: cacheKey (unique) — this is what makes repeat Kundli matches free/instant
3. `appointments`: providerId + slotStart (availability calculation)
4. `messages`: conversationId (chat load performance)
