# 🚀 Smart Platform - Full Stack E-Commerce System

A complete full-stack e-commerce platform built using:

- ⚛️ React.js
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 💳 Razorpay
- 🔐 JWT Authentication

---

# 📦 Features

## 👤 User Features

- User Registration
- User Login
- JWT Authentication
- Product Browsing
- Product Details
- Add To Cart
- Checkout
- Order Management

---

## 👑 Admin Features

- Admin Dashboard
- Product Management
- User Management
- Order Tracking
- Sales Overview

---

## 💳 Payment Features

- Razorpay Integration
- Secure Checkout
- Order Payment Tracking

---

# 📁 Project Structure

```text
smart-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── pages/
│   ├── services/
│   ├── src/
│   └── package.json
│
├── docker/
│   └── Dockerfile
│
├── database/
│   └── schema.sql
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Move To Project

```bash
cd e-commerce-platform
```

---

# 📦 Install Dependencies

## Install Backend + Frontend

```bash
npm run install-all
```

---

# 🔐 Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/ecommerce

JWT_SECRET=supersecretkey

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

CLIENT_URL=http://localhost:3000
```

---

# 🚀 Run Project

## Development Mode

```bash
npm run dev
```

---

# 🌍 Frontend URL

```text
http://localhost:3000
```

---

# 🔗 Backend URL

```text
http://localhost:5000
```

---

# 🐳 Docker Run

## Build Image

```bash
docker build -t smart-platform .
```

---

## Run Container

```bash
docker run -p 5000:5000 smart-platform
```

---

# 🧠 API Endpoints

## 👤 Users

| Method | Endpoint |
|---|---|
| POST | /api/users/register |
| POST | /api/users/login |

---

## 📦 Products

| Method | Endpoint |
|---|---|
| GET | /api/products |
| GET | /api/products/:id |

---

## 🛒 Cart

| Method | Endpoint |
|---|---|
| GET | /api/cart |
| POST | /api/cart/add |

---

## 📦 Orders

| Method | Endpoint |
|---|---|
| POST | /api/orders |
| GET | /api/orders/my |

---

# 🛠️ Tech Stack

| Frontend | Backend | Database |
|---|---|---|
| React.js | Node.js | MongoDB |
| HTML/CSS | Express.js | Mongoose |
| JavaScript | JWT Auth | SQL Schema |

---

# 🔥 Future Improvements

- Stripe Integration
- Email Notifications
- Product Reviews
- Wishlist
- AI Recommendations
- Analytics Dashboard
- Dark Mode

---

# 👨‍💻 Author

## Dinesh Gaikwad

Full Stack Developer

---

# 📄 License

This project is licensed under the ISC License.

---

# ⭐ Final Result

✅ Production-ready architecture  
✅ Full-stack setup  
✅ Authentication system  
✅ Cart + Checkout  
✅ Admin dashboard  
✅ Docker support  
✅ API integration  

🚀 Smart Platform is now ready for deployment.