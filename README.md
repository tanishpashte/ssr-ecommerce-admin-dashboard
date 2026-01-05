# 🛒 E-Commerce Admin Dashboard (SSR)

A high-performance, server-side rendered (SSR) admin suite designed for modern e-commerce management. Built with the **Next.js App Router**, this dashboard prioritizes speed, clean architecture, and a bold **Neobrutalism UI** aesthetic.

---

### ✨ Key Features

* **Secure Authentication:** Role-based access using **NextAuth.js** (Credentials Provider).
* **Product Management:** Full CRUD operations featuring a sleek modal-based editing system.
* **Smart Media:** Integrated image uploads via **Cloudinary**.
* **Data Visualization:** Insightful analytics and trends powered by **Recharts**.
* **Flexible UX:** Instant toggle between **Grid** and **Table** views for product inventory.
* **Neobrutal UI:** A distinct, high-contrast design system built with **Tailwind CSS**.
* **Robust Backend:** Optimized **MongoDB** integration with Mongoose schema validation.

---

### Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 14+ (App Router, SSR) |
| **Styling** | Tailwind CSS (Neobrutalism Design) |
| **Database** | MongoDB + Mongoose |
| **Auth** | NextAuth.js |
| **Charts** | Recharts |
| **Validation** | Zod |
| **Storage** | Cloudinary |

---

### 🚀 Getting Started

#### 1. Clone & Install

```bash
git clone <repo-url>
cd <repo>
npm install

```

#### 2. Environment Configuration

Create a `.env.local` file in the root directory and populate it with your credentials:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

```

#### 3. Seed & Launch

```bash
node scripts/seed.js  # Pre-fill the DB with sample products
npm run dev           # Start development server

```

---

### 🔐 Demo Credentials

> **Admin Access**
> * **Email:** `admin@test.com`
> * **Password:** `admin123`
> 
> 

---

### 🧭 Route Map

* `/` — Public Landing Page
* `/admin/login` — Secure Authentication
* `/admin/dashboard` — Business Overview & Key Metrics
* `/admin/products` — Inventory CRUD & View Toggles
* `/admin/analytics` — In-depth Data Visualization

---

### 🎥 Media & Preview

| Project Demo |
| --- |
| 📺 **[Watch the Demo Video](https://www.google.com/search?q=your-link-here)** |

> **Note:** The database comes pre-seeded. Some products intentionally lack images to demonstrate fallback UI states and empty state handling.

---
