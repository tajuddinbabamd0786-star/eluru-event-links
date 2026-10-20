# ELURU EVENT LINKS — Production Business Directory & Event Services Platform

Modern, responsive business directory and event-services discovery platform for Eluru and nearby areas in Andhra Pradesh, India.
Founded by **T. Ganesh Gowtham**.

---

## 🌟 Key Features

1. **Brand Identity & Telugu Heritage**:
   - Official brand logo with Telugu tagline: *"ఒక్క క్లిక్‌తో.. పెళ్లి పనులు సులువుగా!"*
   - Reusable colors (Burgundy, Gold, Purple, Rose, Navy) and typography (Playfair Display & Poppins).
   - Direct Call and Central WhatsApp integration across the platform.

2. **Five Comprehensive Event Categories**:
   - **Function Halls**: Mandapams & AC/Non-AC banquet venues (Venkatrama Kalyana Mandapamu, VTR GRAND, Sri Vasavi Kanyaka Parameswari Satram, Sri Krishna Residency).
   - **Photography**: Wedding coverage, drone shoots, candid photography, album delivery (Sweet Shots, UMA Photography).
   - **Catering**: Andhra vegetarian & non-vegetarian feasts, catering squads (Maruthi, Naga, L. Srinu Catering Boys, Friends Circle).
   - **Decoration**: Fresh flower styling, mandapam decoration, reception arches.
   - **Transportation**: AC cars, tempo travellers, sleeper buses, and APSRTC Government hire buses.

3. **Customer Discovery & Enquiries**:
   - Dynamic search matching venue names, Telugu names, locations, capacities, and facilities.
   - Dynamic Category Pages with filters and sorting.
   - Dynamic Business Detail Pages (`/business/[id]`) with image galleries, Google Maps directions, and availability slots.
   - Real database-backed Enquiry Submission workflow (`/api/enquiries`).

4. **Security & Admin Dashboard (`/admin`)**:
   - Protected by server-side Role-Based Access Control (RBAC) and NextAuth JWT sessions.
   - Dedicated Admin email: `eluruevents@gmail.com`.
   - Business Management (Add, Edit, Delete, Duplicate, Toggle Featured, Toggle Active).
   - Public Availability & Booking Slots management with double-booking prevention.
   - Customer Enquiries review and status pipeline (NEW, CONTACTED, CONFIRMED, COMPLETED, CANCELLED).
   - Testimonial approval and moderation workflow.
   - Centralized Website Settings editor (Primary Phone, WhatsApp Number, Email, Address, Instagram, Hero Banner text).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router) & TypeScript
- **Styling**: Tailwind CSS, Neumorphism design accents, Lucide Icons
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with bcryptjs password hashing and server-side RBAC
- **Deployment & Server**: Node.js v24+

---

## 🚀 Getting Started

### 1. Environment Variables (`.env`)
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="eluru-event-links-super-secure-secret-key-2026-very-random"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Seed Initial Database
```bash
node scripts/seed.js
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build & Production Start
```bash
npm run build
npm run start
```

---

## 🔐 Admin Access
- **URL**: `http://localhost:3000/admin`
- **Authorized Email**: `eluruevents@gmail.com`
- **Initial Password**: `Admin@Eluru2026!` (Configured via secure bcrypt hashing in database seed)

# eluru-event-links
