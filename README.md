# 🔐 NextShield — Full Stack Authentication (Next.js + Express + MongoDB + JWT)

A secure **Full Stack Authentication System** built using  
**Next.js (frontend)** + **Express.js (backend)** + **MongoDB (database)**.  

Users can **register, log in, and access a protected dashboard** using **JWT-based authentication**.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Next.js 14+ (App Router)**
- **React Hooks**
- **Axios** (API calls)
- **TailwindCSS** (styling)
- **LocalStorage** (token storage)

### ⚙️ Backend
- **Node.js** + **Express.js**
- **MongoDB + Mongoose**
- **JWT** (token authentication)
- **bcrypt** (password hashing)
- **dotenv**, **CORS**

---

## 📂 Folder Structure

```bash
📦 nextshield
├── 📁 backend
│   ├── config.js
│   ├── server.js
│   ├── users.js
│   └── routes/
│       └── auth.js
├── 📁 frontend
│   ├── app/
│   │   ├── login/page.jsx
│   │   ├── register/page.jsx
│   │   └── dashboard/page.jsx
│   ├── components/
│   ├── package.json
│   └── tailwind.config.js
└── README.md

🚀 Setup Instructions
🔹 Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start backend server:

npm start


✅ Backend running at:
http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install
npm run dev


✅ Frontend running at:
http://localhost:3000

📡 API Endpoints
🔸 Register User

POST /api/auth/register

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

🔸 Login User

POST /api/auth/login

{
  "email": "john@example.com",
  "password": "123456"
}


✅ Response:

{
  "token": "your-jwt-token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

🔸 Get User (Protected)

GET /api/auth/user

Header:

Authorization: Bearer <token>

🧑‍💻 Frontend Flow
🔹 Login Page (/login)

Users enter email & password

On submit → sends POST to backend

If successful → token saved in localStorage → redirect to /dashboard

🔹 Register Page (/register)

Collects user details → registers via API → redirects to login

🔹 Dashboard Page (/dashboard)

Loads user data by verifying JWT from localStorage

If no token → redirects to login

🧰 Example .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:5000


Then in your code:

const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, formData);

🌐 Deployment Guide
✅ Backend (Render)

Push project to GitHub

Go to Render.com
 → New Web Service

Set root directory: backend

Add environment variables:

PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Deploy 🚀
Your backend will be hosted at something like:
https://your-backend.onrender.com

✅ Frontend (Vercel)

Go to Vercel.com
 → Import GitHub Repo

Set root directory: frontend

Add environment variable:

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com


Deploy 🚀
Your frontend will be hosted at something like:
https://your-frontend.vercel.app

🧠 Notes

Keep .env and .env.local out of GitHub using .gitignore

Replace local API URLs with process.env.NEXT_PUBLIC_API_URL

Use MongoDB Atlas for cloud database

Always handle JWT expiration in frontend logic

👨‍💻 Author

Developer: Pankaj Upadhyay
📧 Email: upadhayay.pankaj1986@gmail.com

💼 GitHub: github.com/pu1986

⭐ Show Some Love

If this project helped you, give it a ⭐ on GitHub and share it!

💥 NextShield — Built with ❤️ using Next.js, Express & MongoDB