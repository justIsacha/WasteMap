
# 🗑️ WasteMap — Smart Waste Collection Platform

WasteMap is a **MERN stack** web application designed to simplify waste management for **landlords** and **residents** by enabling them to easily request waste collection services and mark collection points on an interactive map.  
Admins can monitor and manage all waste requests efficiently through a dedicated dashboard.

---

## 📘 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Screenshots](#screenshots)
6. [Installation Guide](#installation-guide)
7. [Environment Variables](#environment-variables)
8. [API Endpoints](#api-endpoints)
9. [Folder Structure](#folder-structure)
10. [Future Enhancements](#future-enhancements)
11. [Author](#author)
12. [License](#license)

---

## 🧭 Overview
**WasteMap** helps bridge the gap between waste producers (landlords) and waste management services.  
By submitting collection requests with geolocation pins, users can efficiently notify collection teams, while administrators can monitor all active and completed requests in real-time.

---

## ⚙️ Features

### 👤 User (Landlord)
- Register and log in securely.
- Create and manage waste collection requests.
- Pin waste location on an interactive map.
- View request history and current status.

### 🛠️ Admin
- Access a dedicated dashboard.
- View all user requests.
- Update or delete requests.
- Change request status (`Pending`, `In Progress`, `Completed`).

---

## 💻 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT) + bcrypt |
| **Map Integration** | Google Maps API / Leaflet.js |
| **State Management** | React Context API |
| **Deployment (Optional)** | Vercel (Frontend) + Render (Backend) + MongoDB Atlas |

---

## 🏗️ System Architecture

```
Frontend (React + Tailwind)
        ↓
API Gateway (Express Server)
        ↓
Business Logic (Controllers)
        ↓
MongoDB Database (Mongoose)
```

---

## 🖼️ Screenshots
_(To be added later)_

- 🏠 Landing Page  
- 📍 Waste Location Pinning Interface  
- 👤 User Dashboard  
- 🧹 Admin Dashboard  

---

## 🧩 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/WasteMap.git
cd WasteMap
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:5000` by default.

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (Vite default).

---

## 🔐 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |

### Request Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/requests` | Create a new waste request |
| GET | `/api/requests` | Get all requests (admin only) |
| GET | `/api/requests/:id` | Get a single request |
| PUT | `/api/requests/:id` | Update request status |
| DELETE | `/api/requests/:id` | Delete a request |

---

## 🗂️ Folder Structure

```
WasteMap/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🌍 Future Enhancements
- 🌐 Real-time waste truck tracking using WebSockets.  
- 📸 Image uploads for waste verification.  
- 📨 Notification system (email/SMS).  
- 📊 Admin analytics dashboard.  
- 📅 Scheduling automatic pickups.

---

## 🧑‍💻 Author
**Victor Mwololo**  
MERN Stack Developer | Passionate about sustainable digital solutions  
📧 Email: _your.email@example.com_  
🌐 GitHub: [github.com/yourusername](https://github.com/yourusername)

---

## 📜 License
This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

⭐ **If you like this project, please star it on GitHub!**
