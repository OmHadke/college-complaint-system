# College Complaint Management System (Backend)

A role-based backend system that allows **students** to submit complaints and **admins** to manage and resolve them. Built with **Node.js, Express, MongoDB**, and **JWT authentication using HTTP-only cookies**.

---

## 🚀 Features

### Authentication & Authorization

* User registration & login
* JWT-based authentication (stored in HTTP-only cookies)
* Role-based access control (Student / Admin)
* Secure logout

### Complaint Management

* Students can submit complaints
* Students can view their own complaints
* Admins can view all complaints
* Admins can update complaint status (pending → in_progress → resolved)

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Authentication:** JWT + HTTP-only cookies
* **Security:** Role-based middleware

---

## 📂 Project Structure

```
backend/
│── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── complaint.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── admin.routes.js
│   │   └── complaint.routes.js
│   ├── config/
│   │   └── db.js
│   └── app.js
│── server.js
│── package.json
│── .env
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `POST /api/auth/logout` – Logout user

### Complaints

* `POST /api/complaints` – Student submits complaint
* `GET /api/complaints/my` – Student views own complaints
* `GET /api/complaints` – Admin views all complaints
* `PATCH /api/complaints/:id/status` – Admin updates complaint status

---

## ⚙️ Environment Variables

Created a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🧠 Architecture Overview

```
Client (Browser / Thunder Client)
        ↓
Express Routes
        ↓
Auth Middleware (JWT + RBAC)
        ↓
Controllers
        ↓
MongoDB Atlas
```

---

## ✅ Status

✔ Authentication implemented
✔ Role-based access control
✔ Complaint lifecycle complete

---

## 📌 Future Improvements

* Pagination & filtering
* Email notifications
* Frontend (React)
* Admin analytics dashboard

---


Built as a learning + portfolio project.
