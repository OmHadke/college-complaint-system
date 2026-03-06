# College Complaint Management System (SaaS-style)

A full-stack, role-based complaint management platform for colleges where students can raise issues and admins can triage, track, and resolve them through a structured workflow.

## Why this project matters

Most college complaint processes are slow and opaque. This product digitizes the full lifecycle:
- **Students** submit and track complaints.
- **Admins** manage status progression and resolution.
- **System** enforces role-based access with secure auth cookies.

---

## Live Product Status

✅ Deployed and working end-to-end
- Register user works
- Login sets secure cookie and redirects by role
- Student can submit complaint
- Admin can view and update complaint status
- Logout clears session

---

## Core Features

### Authentication & Authorization
- JWT-based authentication with **HTTP-only cookies**
- Role-based access control (**student/admin**)
- Protected routes for frontend and backend APIs

### Student Workflow
- Register/login
- Submit a complaint with category and description
- View complaint history and status

### Admin Workflow
- View all complaints
- Filter by status
- Update lifecycle: `pending → in_progress → resolved`

### Product UX
- Interactive dashboards for students/admins
- Clean SaaS-style shell UI
- Responsive interface and status badges

---

## Tech Stack

**Frontend**
- React + Vite
- React Router
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + Cookie Parser + CORS

---

## Architecture (high level)

```text
React Frontend
   ↓  (withCredentials cookies)
Express API (Auth + RBAC + Complaint controllers)
   ↓
MongoDB Atlas
```

---

## Deployment

- Frontend deployed separately (Vite build)
- Backend deployed as Node service
- MongoDB Atlas for persistent storage
- Environment-driven API base URL support in frontend (`VITE_API_BASE_URL`)

---
