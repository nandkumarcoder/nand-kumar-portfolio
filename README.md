# 🚀 Nand Kumar | Full-Stack Developer Portfolio

<div align="center">

![Nand Kumar](./frontend/src/assets/logo.png)

**Full-Stack Developer · AI Engineer · Data Scientist · Node.js Expert · Zoho Specialist**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://nandkumarcoder.github.io/nand-kumar-portfolio/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🌐 Live Demo

👉 **[https://nandkumarcoder.github.io/nand-kumar-portfolio/](https://nandkumarcoder.github.io/nand-kumar-portfolio/)**

---

## 📖 About

A **Full-Stack Portfolio & Blog Platform** built from the ground up with **React 18** on the frontend and **Node.js + Express** on the backend. Designed to showcase projects, publish tech articles, and allow visitors to contact me directly at my inbox.

This project is a complete rewrite and upgrade of the original vanilla HTML/CSS/JS portfolio into a modern, component-driven React application with a RESTful API backend.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | Core UI Framework |
| **React Router v7** | Client-side Routing |
| **Vanilla CSS3** | Custom Design System (Glassmorphism) |
| **HTML5 Canvas** | Particle Background |
| **Lucide React** | Icon Library |
| **Web3Forms API** | Direct Inbox Email Delivery |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API Server |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password Hashing |
| **CORS** | Cross-Origin Resource Sharing |
| **In-Memory Store** | Lightweight Data Layer |

---

## ✨ Key Features

### 🎨 UI & Design
- 🌙 **Dark / Light / System Mode** — Three-way theme switcher that respects OS preference and persists in `localStorage`
- ✨ **Glassmorphism Design** — Premium translucent cards with animated HSL glow borders
- 🌌 **Particle Constellation Background** — HTML5 Canvas particle network that adapts colors to the active theme
- ⌨️ **Role Typing Animation** — Hero section cycles through roles: *Full-Stack Developer, AI Developer, Data Scientist, Node.js Developer, Zoho Specialist*
- 📸 **Custom Profile Avatar** — Hero section and navbar logo display my personal photo

### 📄 Pages
- **Home** — Hero, About, Skills, Projects, Contact sections
- **Blog** — Searchable, filterable tech articles with likes, tags, and read time
- **Blog Post Detail** — Full markdown-style article view with author card
- **Sign In / Sign Up** — JWT-authenticated login with role-based access (Admin / User)
- **Dashboard** — Admin dashboard to view contact messages and manage blog posts

### 📬 Contact & Email
- Contact form sends messages **directly to `nandkumarcoder@gmail.com`** via Web3Forms API
- Fallback `mailto:` link opens mail client if API fails
- Backend stores all messages for admin review at `/api/contact`

### 🔐 Authentication
- JWT-based login with `bcrypt` password hashing
- Admin role: `nandkumarcoder@gmail.com`
- Protected routes for Dashboard and blog management

---

## 📁 Project Structure

```
nand-kumar-portfolio/
├── frontend/                 # React 18 + Vite app
│   ├── src/
│   │   ├── assets/           # Images, logo
│   │   ├── components/       # Navbar, Hero, About, Skills, Projects, Contact, Chatbot, Footer
│   │   ├── context/          # AuthContext, ThemeContext
│   │   ├── pages/            # Home, BlogPage, BlogPostDetail, SignInPage, DashboardPage
│   │   ├── App.jsx           # Router + Providers
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global design system
│   ├── index.html
│   └── vite.config.js
│
├── backend/                  # Node.js + Express REST API
│   ├── data/
│   │   └── store.js          # In-memory data store (users, posts, messages)
│   ├── middleware/
│   │   └── auth.js           # JWT auth middleware
│   ├── routes/
│   │   ├── auth.js           # POST /api/auth/login, /register
│   │   ├── posts.js          # GET/POST/PUT/DELETE /api/posts
│   │   └── contact.js        # POST /api/contact (→ sends to Gmail inbox)
│   └── server.js             # Express app entry point
│
├── index.html                # Original vanilla HTML portfolio (legacy)
├── styles.css                # Original vanilla CSS (legacy)
├── script.js                 # Original vanilla JS (legacy)
└── README.md
```

---

## 💻 Local Setup

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org))
- **npm** v9+

### 1. Clone the repository
```bash
git clone https://github.com/nandkumarcoder/nand-kumar-portfolio.git
cd nand-kumar-portfolio
```

### 2. Start the Backend API
```bash
cd backend
npm install
node server.js
# Backend running at http://localhost:5000
```

### 3. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend running at http://localhost:5173
```

### 4. Open in browser
Navigate to **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `nandkumarcoder@gmail.com` | `Nand@1234` |
| **User** | `alex@example.com` | `user1234` |

---

## 🚀 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/auth/register` | No | Register new user |
| GET | `/api/posts` | No | Get all blog posts |
| GET | `/api/posts/:id` | No | Get single post |
| POST | `/api/posts` | Admin | Create blog post |
| PUT | `/api/posts/:id` | Admin | Update blog post |
| DELETE | `/api/posts/:id` | Admin | Delete blog post |
| POST | `/api/contact` | No | Send contact message to inbox |
| GET | `/api/contact` | Admin | View all messages |

---

## 📬 Contact

<div align="center">

| | |
|---|---|
| 📧 **Email** | [nandkumarcoder@gmail.com](mailto:nandkumarcoder@gmail.com) |
| 💼 **LinkedIn** | [linkedin.com/in/nand-kumar-943jf](https://www.linkedin.com/in/nand-kumar-943jf/) |
| 🐙 **GitHub** | [@nandkumarcoder](https://github.com/nandkumarcoder) |
| 📍 **Location** | Kanpur, Uttar Pradesh, India |

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to fork, star ⭐, and share!

---

<div align="center">

Made with ❤️ by **Nand Kumar** | Full-Stack Developer from Kanpur, India

</div>
