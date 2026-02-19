# SkillBridge 🎓  
**Connect with Expert Tutors, Learn Anything**

---

## 📌 Overview
SkillBridge is a full-stack web application that connects learners with expert tutors.  
Students can browse tutor profiles, view availability, and book sessions instantly.  
Tutors can manage their profiles, set availability, and track teaching sessions.  
Admins oversee the platform and manage users.

---

## 👥 Roles & Permissions

| Role       | Description                        | Key Permissions |
|------------|------------------------------------|----------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor**   | Experts who offer tutoring services | Create profile, set availability, view bookings, manage subjects |
| **Admin**   | Platform moderators                 | Manage all users, view analytics, moderate content |

> 💡 Users select their role during registration. Admin accounts should be seeded in the database.

---

## 🛠 Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, Radix UI  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL / MySQL  
- **Auth:** Better-Auth, JWT  
- **State Management:** TanStack Query, React Hook Form  
- **Other Tools:** Recharts, Sonner, Zod, DnD Kit  

---

## ✨ Features

### Public
- Browse and search tutors by subject, rating, and price  
- Filter tutors by category  
- View detailed tutor profiles with reviews  
- Landing page with featured tutors  

### Student
- Register/login as student  
- Book tutoring sessions  
- View upcoming and past bookings  
- Leave reviews after sessions  
- Manage profile  

### Tutor
- Register/login as tutor  
- Create/update tutor profile  
- Set availability slots  
- View teaching sessions  
- See ratings and reviews  

### Admin
- View all users (students and tutors)  
- Manage user status (ban/unban)  
- View all bookings  
- Manage categories  

---

## 🌐 Pages & Routes

### Public
- `/` → Home (Hero, search, featured tutors)  
- `/tutors` → Browse Tutors (list + filters)  
- `/tutors/:id` → Tutor Profile (details, reviews, booking)  
- `/login` → Login  
- `/register` → Register  

### Student (Private)
- `/dashboard` → Overview, bookings  
- `/dashboard/bookings` → Booking history  
- `/dashboard/profile` → Edit profile  

### Tutor (Private)
- `/tutor/dashboard` → Sessions, stats  
- `/tutor/availability` → Set time slots  
- `/tutor/profile` → Edit tutor info  

### Admin (Private)
- `/admin` → Dashboard (statistics)  
- `/admin/users` → Manage users  
- `/admin/bookings` → All bookings  
- `/admin/categories` → Manage categories  

---

## 🗄 Database Schema

- **Users** → Authentication + role info  
- **TutorProfiles** → Tutor-specific details (linked to Users)  
- **Categories** → Subject categories  
- **Bookings** → Student ↔ Tutor sessions  
- **Reviews** → Student feedback for tutors  

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  
- `GET /api/auth/me` → Get current user  

### Tutors
- `GET /api/tutors` → Get all tutors (with filters)  
- `GET /api/tutors/:id` → Get tutor details  
- `GET /api/categories` → Get all categories  

### Bookings
- `POST /api/bookings` → Create booking  
- `GET /api/bookings` → Get user’s bookings  
- `GET /api/bookings/:id` → Get booking details  

### Tutor Management
- `PUT /api/tutor/profile` → Update tutor profile  
- `PUT /api/tutor/availability` → Update availability  

### Reviews
- `POST /api/reviews` → Create review  

### Admin
- `GET /api/admin/users` → Get all users  
- `PATCH /api/admin/users/:id` → Update user status  

---

## 📊 Flow Diagrams

### Student Journey
Today
# SkillBridge 🎓
**"Connect with Expert Tutors, Learn Anything"**

---

## Project Overview

SkillBridge is a full-stack web application that connects learners with expert tutors. Students can browse tutor profiles, view availability, and book sessions instantly. Tutors can manage their profiles, set availability, and track their teaching sessions. Admins oversee the platform and manage users.

---

## Roles & Permissions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor** | Experts who offer tutoring services | Create profile, set availability, view bookings, manage subjects |
| **Admin** | Platform moderators | Manage all users, view analytics, moderate content |

> 💡 **Note**: Users select their role during registration.Admin accounts should be seeded in the database.

---

## Tech Stack

🛠️ **See [README.md](./README.md#-tech-stack) for complete technology specifications.**

---

## Features

### Public Features
- Browse and search tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### Student Features
- Register and login as student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews after sessions
- Manage profile

### Tutor Features
- Register and login as tutor
- Create and update tutor profile
- Set availability slots
- View teaching sessions
- See ratings and reviews

### Admin Features
- View all users (students and tutors)
- Manage user status (ban/unban)
- View all bookings
- Manage categories

---

## Pages & Routes

> ⚠️ **Note**: These routes are examples. You may add, edit, or remove routes based on your implementation needs.

### Public Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, search, featured tutors |
| `/tutors` | Browse Tutors | List with filters |
| `/tutors/:id` | Tutor Profile | Details, reviews, book |
| `/login` | Login | Login form |
| `/register` | Register | Registration form |

### Student Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Overview, bookings |
| `/dashboard/bookings` | My Bookings | Booking history |
| `/dashboard/profile` | Profile | Edit info |

### Tutor Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/tutor/dashboard` | Dashboard | Sessions, stats |
| `/tutor/availability` | Availability | Set time slots |
| `/tutor/profile` | Profile | Edit tutor info |

### Admin Routes (Private)
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Statistics |
| `/admin/users` | Users | Manage users |
| `/admin/bookings` | Bookings | All bookings |
| `/admin/categories` | Categories | Manage categories |

---

## Database Tables

Design your own schema for the following tables:

- **Users** - Store user information and authentication details
- **TutorProfiles** - Tutor-specific information (linked to Users)
- **Categories** - Subject categories for tutoring
- **Bookings** - Session bookings between students and tutors
- **Reviews** - Student reviews for tutors

> 💡 *Think about what fields each table needs based on the features above.*

---

## API Endpoints

> ⚠️ **Note**: These endpoints are examples. You may add, edit, or remove endpoints based on your implementation needs.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Tutors (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutors` | Get all tutors with filters |
| GET | `/api/tutors/:id` | Get tutor details |
| GET | `/api/categories` | Get all categories |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | Get user's bookings |
| GET | `/api/bookings/:id` | Get booking details |

### Tutor Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/tutor/profile` | Update tutor profile |
| PUT | `/api/tutor/availability` | Update availability |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Update user status |

---

## Flow Diagrams

### 👨‍🎓 Student Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Browse Tutors │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ View Profile │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Book Session │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Attend    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Leave Review │
                              └──────────────┘
```

### 👨‍🏫 Tutor Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Create Profile│
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    Set       │
                              │ Availability │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │View Sessions │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │Mark Complete │
                              └──────────────┘
```

### 📊 Booking Status

```
                              ┌──────────────┐
                              │  CONFIRMED   │
                              │   (instant)  │
                              └──────────────┘
                               /            \
                              /              \
                       (tutor)          (student)
                        marks            cancels
                            /                \
                           ▼                  ▼
                   ┌──────────────┐   ┌──────────────┐
                   │  COMPLETED   │   │  CANCELLED   │
                   └──────────────┘   └──────────────┘
```

---

## Submission

📋 **See [README.md](./README.md) for submission guidelines, timeline, and marks.**


BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
AUTH_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_TEST=assignment
NEXT_PUBLIC_IMGBB_API_KEY=25abaffcc2a5d93bee62409eaed3c398
NEXT_PUBLIC_IMGBB_UPLOAD_URL=https://api.imgbb.com/1/upload


{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/modifiers": "^9.0.0",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-slot": "^1.2.4",
    "@t3-oss/env-nextjs": "^0.13.10",
    "@tabler/icons-react": "^3.36.1",
    "@tanstack/react-form": "^1.28.0",
    "@tanstack/react-query": "^5.90.20",
    "@tanstack/react-table": "^8.21.3",
    "better-auth": "^1.4.18",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.563.0",
    "next": "16.1.6",
    "next-themes": "^0.4.6",
    "radix-ui": "^1.4.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "react-icons": "^5.5.0",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "vaul": "^1.1.2",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@types/node": "^20",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.24",
    "eslint": "^9",
    "eslint-config-next": "16.1.6",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  }
}




write github readme file
Here’s a polished GitHub README.md for your SkillBridge project, structured for clarity and professionalism:

SkillBridge 🎓
Connect with Expert Tutors, Learn Anything

📌 Overview
SkillBridge is a full-stack web application that connects learners with expert tutors.
Students can browse tutor profiles, view availability, and book sessions instantly.
Tutors can manage their profiles, set availability, and track teaching sessions.
Admins oversee the platform and manage users.

👥 Roles & Permissions
Role	Description	Key Permissions
Student	Learners who book tutoring sessions	Browse tutors, book sessions, leave reviews, manage profile
Tutor	Experts who offer tutoring services	Create profile, set availability, view bookings, manage subjects
Admin	Platform moderators	Manage all users, view analytics, moderate content
💡 Users select their role during registration. Admin accounts should be seeded in the database.

🛠 Tech Stack
Frontend: Next.js, React, TailwindCSS, Radix UI

Backend: Node.js, Express.js

Database: PostgreSQL / MySQL (choose based on implementation)

Auth: Better-Auth, JWT

State Management: TanStack Query, React Hook Form

Other Tools: Recharts, Sonner, Zod, DnD Kit

✨ Features
Public
Browse and search tutors by subject, rating, and price

Filter tutors by category

View detailed tutor profiles with reviews

Landing page with featured tutors

Student
Register/login as student

Book tutoring sessions

View upcoming and past bookings

Leave reviews after sessions

Manage profile

Tutor
Register/login as tutor

Create/update tutor profile

Set availability slots

View teaching sessions

See ratings and reviews

Admin
View all users (students and tutors)

Manage user status (ban/unban)

View all bookings

Manage categories

🌐 Pages & Routes
Public
/ → Home (Hero, search, featured tutors)

/tutors → Browse Tutors (list + filters)

/tutors/:id → Tutor Profile (details, reviews, booking)

/login → Login

/register → Register

Student (Private)
/dashboard → Overview, bookings

/dashboard/bookings → Booking history

/dashboard/profile → Edit profile

Tutor (Private)
/tutor/dashboard → Sessions, stats

/tutor/availability → Set time slots

/tutor/profile → Edit tutor info

Admin (Private)
/admin → Dashboard (statistics)

/admin/users → Manage users

/admin/bookings → All bookings

/admin/categories → Manage categories

🗄 Database Schema
Users → Authentication + role info

TutorProfiles → Tutor-specific details (linked to Users)

Categories → Subject categories

Bookings → Student ↔ Tutor sessions

Reviews → Student feedback for tutors

🔗 API Endpoints
Authentication
POST /api/auth/register → Register user

POST /api/auth/login → Login user

GET /api/auth/me → Get current user

Tutors
GET /api/tutors → Get all tutors (with filters)

GET /api/tutors/:id → Get tutor details

GET /api/categories → Get all categories

Bookings
POST /api/bookings → Create booking

GET /api/bookings → Get user’s bookings

GET /api/bookings/:id → Get booking details

Tutor Management
PUT /api/tutor/profile → Update tutor profile

PUT /api/tutor/availability → Update availability

Reviews
POST /api/reviews → Create review

Admin
GET /api/admin/users → Get all users

PATCH /api/admin/users/:id → Update user status

📊 Flow Diagrams
Student Journey
Code
Register → Browse Tutors → View Profile → Book Session → Attend → Leave Review
Tutor Journey
Code
Register → Create Profile → Set Availability → View Sessions → Mark Complete
Booking Status
Code
CONFIRMED → COMPLETED (by tutor) / CANCELLED (by student)
⚙️ Environment Variables
Code
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
AUTH_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_TEST=assignment
NEXT_PUBLIC_IMGBB_API_KEY=25abaffcc2a5d93bee62409eaed3c398
NEXT_PUBLIC_IMGBB_UPLOAD_URL=https://api.imgbb.com/1/upload
🚀 Getting Started
1️⃣ Clone the repo
bash
git clone https://github.com/your-username/skillbridge.git
cd skillbridge
2️⃣ Install dependencies
bash
npm install
3️⃣ Run development server
bash
npm run dev
4️⃣ Build for production
bash
npm run build
npm run start
📋 Submission
See [Looks like the result wasn't safe to show. Let's switch things up and try something else!] for submission guidelines, timeline, and marks.

Would you like me to also create a visual ER diagram for the database schema so it’s easier to understand the relationships between tables?

give me download file
Got it — you’d like the README I drafted turned into a downloadable file. While I can’t directly hand you a file here, I can give you the exact content in a ready-to-save format. You just need to copy it into a file named README.md in your project folder.

Here’s the complete file content:

markdown
# SkillBridge 🎓  
**Connect with Expert Tutors, Learn Anything**

---

## 📌 Overview
SkillBridge is a full-stack web application that connects learners with expert tutors.  
Students can browse tutor profiles, view availability, and book sessions instantly.  
Tutors can manage their profiles, set availability, and track teaching sessions.  
Admins oversee the platform and manage users.

---

## 👥 Roles & Permissions

| Role       | Description                        | Key Permissions |
|------------|------------------------------------|----------------|
| **Student** | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews, manage profile |
| **Tutor**   | Experts who offer tutoring services | Create profile, set availability, view bookings, manage subjects |
| **Admin**   | Platform moderators                 | Manage all users, view analytics, moderate content |

> 💡 Users select their role during registration. Admin accounts should be seeded in the database.

---

## 🛠 Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, Radix UI  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL / MySQL  
- **Auth:** Better-Auth, JWT  
- **State Management:** TanStack Query, React Hook Form  
- **Other Tools:** Recharts, Sonner, Zod, DnD Kit  

---

## ✨ Features

### Public
- Browse and search tutors by subject, rating, and price  
- Filter tutors by category  
- View detailed tutor profiles with reviews  
- Landing page with featured tutors  

### Student
- Register/login as student  
- Book tutoring sessions  
- View upcoming and past bookings  
- Leave reviews after sessions  
- Manage profile  

### Tutor
- Register/login as tutor  
- Create/update tutor profile  
- Set availability slots  
- View teaching sessions  
- See ratings and reviews  

### Admin
- View all users (students and tutors)  
- Manage user status (ban/unban)  
- View all bookings  
- Manage categories  

---

## 🌐 Pages & Routes

### Public
- `/` → Home (Hero, search, featured tutors)  
- `/tutors` → Browse Tutors (list + filters)  
- `/tutors/:id` → Tutor Profile (details, reviews, booking)  
- `/login` → Login  
- `/register` → Register  

### Student (Private)
- `/dashboard` → Overview, bookings  
- `/dashboard/bookings` → Booking history  
- `/dashboard/profile` → Edit profile  

### Tutor (Private)
- `/tutor/dashboard` → Sessions, stats  
- `/tutor/availability` → Set time slots  
- `/tutor/profile` → Edit tutor info  

### Admin (Private)
- `/admin` → Dashboard (statistics)  
- `/admin/users` → Manage users  
- `/admin/bookings` → All bookings  
- `/admin/categories` → Manage categories  

---

## 🗄 Database Schema

- **Users** → Authentication + role info  
- **TutorProfiles** → Tutor-specific details (linked to Users)  
- **Categories** → Subject categories  
- **Bookings** → Student ↔ Tutor sessions  
- **Reviews** → Student feedback for tutors  

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  
- `GET /api/auth/me` → Get current user  

### Tutors
- `GET /api/tutors` → Get all tutors (with filters)  
- `GET /api/tutors/:id` → Get tutor details  
- `GET /api/categories` → Get all categories  

### Bookings
- `POST /api/bookings` → Create booking  
- `GET /api/bookings` → Get user’s bookings  
- `GET /api/bookings/:id` → Get booking details  

### Tutor Management
- `PUT /api/tutor/profile` → Update tutor profile  
- `PUT /api/tutor/availability` → Update availability  

### Reviews
- `POST /api/reviews` → Create review  

### Admin
- `GET /api/admin/users` → Get all users  
- `PATCH /api/admin/users/:id` → Update user status  

---

## 📊 Flow Diagrams

### Student Journey
Register → Browse Tutors → View Profile → Book Session → Attend → Leave Review


### Tutor Journey
Register → Create Profile → Set Availability → View Sessions → Mark Complete


### Booking Status
Register → Create Profile → Set Availability → View Sessions → Mark Complete


### Booking Status
CONFIRMED → COMPLETED (by tutor) / CANCELLED (by student)


---

## ⚙️ Environment Variables

BACKEND_URL=
FRONTEND_URL=
API_URL=
AUTH_URL=
NEXT_PUBLIC_TEST=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_IMGBB_UPLOAD_URL=


---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/skillbridge.git
cd skillbridge


npm install
npm run dev
npm run build
npm run start
```