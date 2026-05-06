// Base API configuration

const BASE_URL = "http://localhost:5000/api";

// 🔐 Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// 🔧 Common request function
const request = async (endpoint, method = "GET", data = null) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() || ""
      },
      body: data ? JSON.stringify(data) : null
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.msg || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};



// =========================
// 🔐 AUTH APIs
// =========================

// Register
export const registerUser = (data) => {
  return request("/users/register", "POST", data);
};

// Login
export const loginUser = async (data) => {
  const res = await request("/users/login", "POST", data);

  // Save token
  localStorage.setItem("token", res.token);

  return res;
};



// =========================
// 📦 PRODUCT APIs
// =========================

// Get all products
export const getProducts = () => {
  return request("/products");
};

// Add product (admin)
export const addProduct = (data) => {
  return request("/products", "POST", data);
};



// =========================
// 🛒 CART APIs
// =========================

// Get cart
export const getCart = () => {
  return request("/cart");
};

// Add to cart
export const addToCart = (data) => {
  return request("/cart/add", "POST", data);
};



// =========================
// 📦 ORDER APIs
// =========================

// Create order
export const createOrder = () => {
  return request("/orders", "POST");
};

// Get orders
export const getOrders = () => {
  return request("/orders");
};



// =========================
// 💳 PAYMENT APIs
// =========================

// Create payment order
export const createPayment = (amount) => {
  return request("/payment/create", "POST", { amount });
};

// Verify payment
export const verifyPayment = (data) => {
  return request("/payment/verify", "POST", data);
};



// =========================
// 👑 ADMIN APIs
// =========================

// Dashboard data
export const getAdminDashboard = () => {
  return request("/admin/dashboard");
};



// =========================
// 🚪 LOGOUT
// =========================

export const logout = () => {
  localStorage.removeItem("token");
};