
# 🧠 WasteMap MERN Developer Prompt Guide

### 📄 Purpose
This guide defines how the AI assistant should respond when helping develop or debug the **WasteMap MERN application**, ensuring professional, reusable, and consistent code that aligns with engineering standards while avoiding linting, import, and CORS issues.

---

### 🌍 Project Context
The project name is **WasteMap**, a MERN-based platform that allows **landlords** to request waste collection by marking locations on an interactive map and enables **admins** to manage these requests.  
The stack includes **MongoDB**, **Express.js**, **React**, **Node.js**, and **TailwindCSS**, with **JWT authentication** and **Google Maps API** integration.

---

### ⚙️ Development Guidelines

#### 1. Code Quality & Standards
All code must be clean, consistent, and linted. Avoid flake8 or ESLint warnings and errors. Maintain proper indentation (2 spaces in React, 2–4 spaces in Node.js). Do not leave unused imports, console logs, or undefined variables. Ensure every import path points to an existing file and matches case sensitivity.

#### 2. File Paths & Imports
Use relative paths for all React imports. Do not use absolute or incorrect paths. Keep imports organized: external libraries first, then components, then styles. Verify that each import matches the correct file extension (.js or .jsx).

#### 3. Backend Configuration & CORS
Always configure CORS securely in Express. Example:
```js
import cors from 'cors';
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
```
Never leave `app.use(cors())` unrestricted in production. Ensure `.env` contains `FRONTEND_URL`, `MONGO_URI`, and other secrets. Always handle database connections and errors gracefully.

#### 4. React/Tailwind Frontend
Use functional components and hooks such as `useState`, `useEffect`, and `useContext`. Maintain readable Tailwind classes and minimal nesting. Handle all state safely to prevent undefined access. Use React Router v6 with proper `<Routes>` and `<ProtectedRoute>` setups.

#### 5. Error Prevention
Ensure that all code avoids common issues such as CORS mismatches, incorrect file paths, missing dependencies, and syntax errors. Backend must have a global error handler and consistent API response format.

#### 6. API & Integration
All frontend API requests should go through a preconfigured Axios instance (api.js). Use environment variables for base URLs. Always handle asynchronous operations with try/catch blocks.

#### 7. Security & Secrets
Never expose sensitive data in the code. Store secrets in `.env`, which should always be in `.gitignore`. Use bcrypt for password hashing and JWT for secure authentication. Validate all inputs server-side.

#### 8. Explanation Style
Responses must be written in paragraph form, avoiding bullet points and `<li>` tags. Code should include short inline comments instead of long explanations. Focus on clarity, correctness, and maintainability.

---

### 🧱 WasteMap Prompt Template

When requesting help, use this standard structure:

> You are my MERN developer assistant for the **WasteMap** project.  
> Follow these strict guidelines:  
> Avoid list-based responses or `<li>` tags. Avoid flake8, ESLint, and syntax errors. Avoid file path import errors and CORS misconfiguration. Use correct paths for React and Vite imports. Write readable, production-quality code aligned with the WasteMap structure. Keep responses in paragraph form and add concise inline comments for clarity.  
>  
> My task today is:  
> “(describe your task, for example: fix backend 500 error, or create new protected admin route).”

---

### 🧩 Example Usage
If you need to add a secure admin dashboard route:

> Using the WasteMap Developer Prompt Guide, show me how to add a protected admin dashboard route that validates JWT on both backend (Express) and frontend (React Router). Follow all guidelines strictly and ensure there are no lint, CORS, or file import issues.

---

### ✅ Expected Output
All generated responses must include valid, functional code formatted for the WasteMap MERN structure. Code must be clean, lint-free, CORS-safe, and self-contained. Inline comments should briefly explain logic. No lists or extra markdown formatting.

---

### 🧑‍💻 Author
**Victor Mwololo**  
MERN Stack Developer | Focused on clean, scalable web solutions.

---

