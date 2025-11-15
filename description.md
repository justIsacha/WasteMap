
# 🗑️ WasteMap

## Overview
**WasteMap** is a **MERN (MongoDB, Express, React, Node.js)** web application designed to help **landlords and residents** manage waste collection efficiently.  
The platform allows users to **create accounts**, **request waste collection services**, and **pin exact collection locations** on an interactive map.  
Administrators can view, manage, and track waste collection requests through a dedicated **Admin Dashboard**.

---

## 🎯 Objectives
- Simplify waste management for landlords and property owners.  
- Provide real-time waste collection requests with location data.  
- Enable admins to monitor and coordinate collection activities efficiently.  
- Promote a cleaner and more sustainable environment through organized waste management.

---

## ⚙️ Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | JSON Web Tokens (JWT) + bcrypt |
| **Mapping** | Google Maps API or Leaflet.js (for pinning locations) |
| **State Management** | React Context API |
| **Deployment (optional)** | Vercel (Frontend), Render (Backend), MongoDB Atlas (Database) |

---

## 👥 User Roles
### 1. **User (Landlord)**
- Create an account and log in.  
- Submit a **waste collection request** with:  
  - Waste description (e.g., household, recyclable, bulky).  
  - Location (pinned on the map).  
- View their request status and history.

### 2. **Admin**
- Access an **Admin Dashboard**.  
- View all waste collection requests.  
- Filter, update, or delete requests.  
- Mark requests as “Pending”, “In Progress”, or “Completed”.

---

## 🧩 Core Features
✅ User authentication (Register/Login)  
✅ Create, read, update, and delete waste collection requests  
✅ Location pinning using an interactive map  
✅ Admin dashboard for managing requests  
✅ Responsive design built with **Tailwind CSS**

---

## 📁 Project Structure
```
WasteMap/
│
├── 📁 backend/                        # Server-side (Node.js + Express + MongoDB)
│   │
│   ├── 📁 config/                     # Database connection and environment setup
│   │   └── db.js                      # Connects to MongoDB using Mongoose
│   │
│   ├── 📁 controllers/                # Logic for handling routes
│   │   ├── authController.js          # Handles user registration & login
│   │   └── requestController.js       # Handles waste collection requests (CRUD)
│   │
│   ├── 📁 models/                     # MongoDB data models (schemas)
│   │   ├── User.js                    # Schema for landlord/admin accounts
│   │   └── Request.js                 # Schema for waste collection requests
│   │
│   ├── 📁 middleware/                 # Express middleware (security, auth)
│   │   ├── authMiddleware.js          # Protects routes, verifies JWT tokens
│   │   └── errorHandler.js            # Global error handler
│   │
│   ├── 📁 routes/                     # Express route definitions
│   │   ├── authRoutes.js              # /api/auth → Register/Login routes
│   │   └── requestRoutes.js           # /api/requests → Request CRUD routes
│   │
│   ├── 📁 utils/                      # Helper functions (e.g., JWT generation)
│   │   └── generateToken.js           # Generates signed JWT tokens
│   │
│   ├── .env                           # Environment variables (ignored by git)
│   ├── server.js                      # Entry point of the backend
│   ├── package.json                   # Backend dependencies
│   └── README.md                      # Optional backend-specific docs
│
│
├── 📁 frontend/                       # Client-side (React + Tailwind)
│   │
│   ├── 📁 public/                     # Static files (favicon, icons, index.html)
│   │   └── index.html
│   │
│   ├── 📁 src/                        # React source folder
│   │   │
│   │   ├── 📁 assets/                 # Images, icons, and static assets
│   │   │   └── logo.png
│   │   │
│   │   ├── 📁 components/             # Reusable UI elements
│   │   │   ├── Navbar.jsx             # Top navigation bar
│   │   │   ├── Map.jsx                # Map component (Google Maps / Leaflet)
│   │   │   ├── RequestCard.jsx        # Displays request details
│   │   │   └── Loader.jsx             # Loading spinner
│   │   │
│   │   ├── 📁 context/                # Global state management
│   │   │   └── AuthContext.jsx        # Provides user authentication state
│   │   │
│   │   ├── 📁 pages/                  # Application views (pages)
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── Login.jsx              # Login form
│   │   │   ├── Register.jsx           # Registration form
│   │   │   ├── Dashboard.jsx          # User (landlord) dashboard
│   │   │   ├── RequestForm.jsx        # Form to create new waste requests
│   │   │   ├── AdminDashboard.jsx     # Admin management dashboard
│   │   │   └── NotFound.jsx           # 404 error page
│   │   │
│   │   ├── 📁 hooks/                  # Custom React hooks
│   │   │   └── useAuth.js             # Handles authentication logic
│   │   │
│   │   ├── 📁 services/               # API calls (Axios)
│   │   │   ├── api.js                 # Axios instance setup
│   │   │   ├── authService.js         # User login/register requests
│   │   │   └── requestService.js      # CRUD operations for waste requests
│   │   │
│   │   ├── App.jsx                    # Main React component (routes setup)
│   │   ├── main.jsx                   # React entry file
│   │   ├── index.css                  # Global CSS styles
│   │   └── tailwind.config.js         # Tailwind configuration
│   │
│   ├── .env                           # Environment variables for frontend (API URL)
│   ├── package.json                   # Frontend dependencies
│   └── vite.config.js                 # Vite configuration file
│
│
├── 📁 docs/                           # Documentation folder
│   ├── description.md                 # Project overview (already created)
│   ├── README.md                      # Detailed project documentation
│   └── architecture-diagram.png       # Optional system diagram
│
├── .gitignore                         # Files/folders to ignore in Git
├── README.md                          # Main README (already created)
└── LICENSE                            # MIT license (optional)

```

---

## 🚀 Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WasteMap.git
   cd WasteMap
   ```

2. **Setup backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   - Create `.env` files in both frontend and backend folders.

   **Backend `.env`:**
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   **Frontend `.env`:**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_MAPS_API_KEY=your_google_maps_api_key
   ```

---

## 🌍 Future Enhancements
- Add real-time tracking for collection trucks.  
- Add notifications (email/SMS) when a request is processed.  
- Add analytics dashboard for admins.  
- Enable photo uploads for waste type verification.

---

## 🧑‍💻 Author
**Victor Mwololo**  
> MERN Developer | Focused on building practical and scalable web solutions.
