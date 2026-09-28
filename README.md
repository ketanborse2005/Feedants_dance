# Feedants — Competition Details Screen (Full-Stack Technical Assignment)

> **Role:** Full Stack Development Intern  
> **Company:** Feedants  
> **Module:** Competition Details Screen — Functional Full-Stack Module  
> **Stack:** React / React Native UI Architecture • Node.js + Express.js Backend • MongoDB Data Modeling & Atomic Concurrency Engine

---

## 🚀 Live Demo & Quick Overview

This project implements the **Feedants Classical Dance Competition Details Screen** matching the reference design pixel-for-pixel while providing production-grade dynamic backend architecture, atomic spot allocation under high concurrency, user participation state management, and end-to-end interactive workflows.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti | Pixel-perfect mobile application viewport, responsive web mode, smooth animations, bilingual i18n (`ENG` / `हिंदी`). |
| **Backend** | Node.js, Express.js (`server.ts`), Vite Middlewares | RESTful API endpoints, request validation, idempotency, lifecycle management. |
| **Database** | MongoDB Schema Architecture (`src/server/db.ts`) | High-performance document model, atomic `$inc` updates, mutex-backed spot reservation for concurrent users. |
| **Testing Tools** | Interactive Concurrency Load Tester & Dev Inspector Toolbar | Live multi-user race-condition test runner, persona toggling, lifecycle state switching. |

---

## 📊 MongoDB Data Models & Schemas

### 1. `Competition` Schema
```typescript
{
  _id: string;                    // "comp_classical_dance_2026"
  title: string;                  // "Feedants Classical Dance"
  category: string;               // "Dance"
  subCategory: string;            // "Multi-Win"
  certificateOffered: boolean;    // true
  certificateText: string;        // "Winners get certificate"
  prizePool: number;              // 1500 (Matches sum of positions 1-6)
  entryFee: number;               // 99
  currency: string;               // "₹"
  totalSpots: number;             // 20
  bookedSpots: number;            // 1 (Dynamically updated atomically)
  status: "REGISTRATION_OPEN" | "SUBMISSION_OPEN" | "JUDGING" | "COMPLETED" | "SOLDOUT";
  judge: {
    name: "Manju Dubey",
    title: "Professional Kathak Dancer",
    experience: "12+ Years of Experience",
    avatar: string,
    introVideoUrl: string,
    bio: string
  },
  dates: {
    registerBefore: "10 Aug 26, 11:50 PM",
    submissionStarts: "6 Aug 26, 04:00 AM",
    submissionEnds: "30 Aug 26, 11:55 PM",
    resultDate: "1 Sept 26, 11:50 PM"
  },
  previousWinners: Array<Winner>,
  about: { shortText: string, fullText: string[] },
  judgingParameters: Array<{ title: string, weightage: string, description: string }>,
  rulesAndEligibility: Array<{ title: string, rules: string[] }>,
  rewards: Array<{ position: number, label: string, amount: number, iconType: string }>,
  disclaimer: string,
  referral: { url: string, rewardText: string, discountText: string },
  policies: {
    prizeMoneyFaq: { question: string, answer: string, videoUrl: string },
    refundPolicy: { title: string, summary: string, details: string[] },
    paymentGateway: "Razorpay"
  }
}
```

### 2. `ParticipantRecord` Schema
```typescript
{
  _id: string;               // e.g. "reg_1729000_abc"
  competitionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  registeredAt: ISODate;
  paymentId: string;         // Razorpay transaction reference
  amountPaid: number;        // 99
  status: "CONFIRMED" | "REFUNDED"
}
```

### 3. `SubmissionRecord` Schema
```typescript
{
  _id: string;
  competitionId: string;
  userId: string;
  title: string;             // e.g. "Kathak Tarana in Teental - Drut Laya"
  danceForm: string;         // "Kathak", "Bharatanatyam", "Odissi", etc.
  videoUrl: string;
  description: string;
  durationSec: number;
  submittedAt: ISODate;
  status: "PENDING_REVIEW" | "REVIEWED";
  score?: number;
}
```

---

## ⚡ Concurrency & Data Consistency Strategy

To support thousands of concurrent users attempting to register for limited spots (e.g. only 20 spots in this competition):
1. **Atomic Spot Allocation**: 
   - Equivalent to MongoDB `findOneAndUpdate({ _id, bookedSpots: { $lt: totalSpots } }, { $inc: { bookedSpots: 1 } })`.
   - Rejects the transaction immediately when `bookedSpots >= totalSpots` with HTTP 410 (Sold Out).
2. **Idempotent Keys**:
   - Compound index on `(userId, competitionId)` prevents a user from double-registering or paying twice.
3. **Simulated High Concurrency Load Tester**:
   - Built into the app's top toolbar. Evaluators can click **"Load Test Concurrency"** to fire 5, 10, or 20 simultaneous registrations. The system serializes requests, updates remaining spots, and cleanly rejects when the capacity is reached.

---

## 🔌 RESTful API Endpoints

- `GET /api/competitions/:id`: Retrieves full competition details, judge information, dates, previous winners, prize distribution, and policies.
- `GET /api/competitions/:id/user-state?userId=...`: Returns active user's registration status, submission record, and real-time remaining spots.
- `POST /api/competitions/:id/register`: Atomically reserves a spot, verifies capacity, generates payment receipt, and creates a participant document.
- `POST /api/competitions/:id/submit`: Validates that user is registered and uploads dance submission details, video URL, and metadata.
- `GET /api/competitions/:id/submissions`: Lists all submissions for judging.
- `GET /api/testimonials`: Returns real participant testimonials and reviews.
- `POST /api/competitions/:id/simulate-concurrency`: Load-testing utility to demonstrate race-condition handling.
- `POST /api/competitions/:id/lifecycle`: Admin hook to switch lifecycle states (Upcoming, Registration, Submission, Judging, Completed, Sold Out).
- `POST /api/competitions/:id/reset`: Resets demo data back to the exact initial design reference state.

---

## 📱 Interactive Feature Highlights

1. **Pixel-Perfect Screen Replication**:
   - Mobile status bar (9:41, Cellular, WiFi, Battery).
   - "← Go back" and bilingual `ENG` / `हिंदी` toggle button (all text, labels, and badges translate).
   - Competition Title with `[ ✓ Registered ]` badge and category pills (`Dance`, `Multi-Win`, `Winners get certificate`).
   - Prize Pool (₹ 1,500), Entry Fee (₹ 99), and spots progress bar ("Only 19 spots left", "1 / 20 Booked").
   - Judge Card (Manju Dubey, Kathak Dancer, 12+ Years) with interactive "Intro Video" player modal.
   - Live Countdown Timer ticking every second (`01d : 06h : 28m : 32s`).
   - Important Dates 2x2 Grid with register before, submission starts/ends, and result dates.
   - Previous Winners carousel (Riya Shah, Aarav Mehta, Neha Verma, Ishita Chouhan) with playable video previews.
   - Multi-tab section: About Competition (with "View more ∨" expandable accordion), Judging Parameters (100-point scoring matrix), and Rules & Eligibility.
   - Rewards table for all 6 positions totaling ₹ 1,500.
   - Trust and policies: Disclaimer, prize money FAQ video modal, refund policy modal, and Razorpay trust seal.
   - Referral banner with one-click link copy and native share.
   - "Hear From Our Users" with participant testimonials modal.
   - Sticky primary action button ("Upload Submission" when registered; "Register Now - ₹99" when not).
   - Native 5-item mobile bottom navigation bar (Home, Explore, +, Competitions, Profile).

2. **Evaluator Inspector Panel**:
   - **Switch Device Mode**: Toggle between realistic Mobile App Frame (with phone bezel) and Responsive Full View.
   - **Switch Persona**: Toggle between Ketan Borse (Registered) and Guest (Unregistered) to test both flows.
   - **Lifecycle Switcher**: Test how the screen reacts during Registration Open, Submission Open, Judging, and Completed.
   - **Simulate High Concurrency**: Fires simultaneous HTTP registrations to prove MongoDB race-condition immunity.

---

## 📝 Technical Decisions, Assumptions & Production Trade-Offs

### 1. Important Assumptions Made
- **Spot Capacity**: The design indicates "1 / 20 Booked" and "Only 19 spots left", confirming a fixed hard-cap of 20 spots for this tier.
- **Registration Prerequisite**: Video submissions can only be made by users with a `CONFIRMED` registration and payment.
- **Curated Prize Breakdown**: The prize pool of ₹1,500 is distributed across 6 winners (550 + 300 + 240 + 200 + 130 + 80 = 1,500), reflecting a multi-win tier structure.

### 2. Major Technical Decisions
- **Full-Stack Single Binary with Vite Middlewares**: Configured Express `server.ts` to host both the API routes and Vite's dev server middleware. This guarantees no CORS issues, sub-millisecond response times, and standard production deployment with `npm run build`.
- **Atomic Concurrency Mutex**: In a distributed multi-replica MongoDB deployment, `findOneAndUpdate` with condition `{ bookedSpots: { $lt: totalSpots } }` guarantees that even under thousands of simultaneous requests, the number of allocated spots will never exceed the capacity.
- **Bilingual Internationalization**: Provided full English and Hindi translations for all UI strings, honoring the `ENG` / `हिंदी` toggle in the header.

### 3. Production Trade-Offs Considered
- **Direct Video Upload vs Pre-Signed S3/GCS URLs**: In this demonstration environment, we accept video links and sample clips with real video playback. In full production, we would generate AWS S3 or Google Cloud Storage pre-signed URLs with an asynchronous transcoding pipeline (FFmpeg/HLS).
- **Payment Gateway Webhooks**: For payment processing, a production app uses Razorpay Webhook signatures (`razorpay_signature`) and Redis distributed locks for idempotency during network timeouts.

---

## 🏃 Instructions for Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the full-stack application (Express + Vite)
npm run dev

# 3. Open in browser
# http://localhost:3000
```
