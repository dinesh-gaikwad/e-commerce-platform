// ===============================
// 🔐 AUTH MANAGEMENT MODULE
// ===============================

// 🔑 Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// 💾 Save Token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// ❌ Remove Token (Logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// ✅ Check if user is logged in
export const isAuthenticated = () => {
  return !!getToken();
};



// ===============================
// 👤 USER DATA (OPTIONAL)
// ===============================

// Save user info
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user info
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Remove user
export const removeUser = () => {
  localStorage.removeItem("user");
};



// ===============================
// 🚪 LOGIN HANDLER
// ===============================

export const handleLogin = (data) => {
  // Expecting: { token, user }
  if (data.token) {
    setToken(data.token);
  }

  if (data.user) {
    setUser(data.user);
  }
};



// ===============================
// 🚪 LOGOUT HANDLER
// ===============================

export const handleLogout = () => {
  removeToken();
  removeUser();

  // Optional redirect
  window.location.href = "/login.html";
};



// ===============================
// 🔐 AUTH HEADER HELPER
// ===============================

export const getAuthHeader = () => {
  const token = getToken();

  return {
    Authorization: token ? token : ""
  };
};



// ===============================
// 🛡️ PROTECT PAGE (FRONTEND)
// ===============================

export const protectPage = () => {
  if (!isAuthenticated()) {
    window.location.href = "/login.html";
  }
};



// ===============================
// 👑 ADMIN CHECK
// ===============================

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};



// ===============================
// 🛑 PROTECT ADMIN PAGE
// ===============================

export const protectAdmin = () => {
  const user = getUser();

  if (!user || user.role !== "admin") {
    alert("Access denied");
    window.location.href = "/";
  }
};