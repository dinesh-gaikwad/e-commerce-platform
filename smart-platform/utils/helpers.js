// =========================================
// 🚀 SMART PLATFORM HELPERS
// =========================================


// =========================================
// 💰 FORMAT CURRENCY
// =========================================
const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};


// =========================================
// 📅 FORMAT DATE
// =========================================
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};


// =========================================
// 🔐 GENERATE RANDOM ID
// =========================================
const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};


// =========================================
// 📦 CALCULATE CART TOTAL
// =========================================
const calculateCartTotal = (items = []) => {

  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

};


// =========================================
// 📉 APPLY DISCOUNT
// =========================================
const applyDiscount = (amount, discountPercent) => {

  const discount = (amount * discountPercent) / 100;

  return amount - discount;
};


// =========================================
// 📧 VALIDATE EMAIL
// =========================================
const validateEmail = (email) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};


// =========================================
// 🔑 MASK CARD NUMBER
// =========================================
const maskCardNumber = (cardNumber) => {

  const str = String(cardNumber);

  return `XXXX-XXXX-XXXX-${str.slice(-4)}`;
};


// =========================================
// 📦 ORDER STATUS COLOR
// =========================================
const getOrderStatusColor = (status) => {

  switch (status) {

    case "pending":
      return "orange";

    case "paid":
      return "blue";

    case "shipped":
      return "purple";

    case "delivered":
      return "green";

    case "cancelled":
      return "red";

    default:
      return "gray";
  }
};


// =========================================
// 🔠 CAPITALIZE TEXT
// =========================================
const capitalize = (text = "") => {

  return text.charAt(0).toUpperCase() +
         text.slice(1);
};


// =========================================
// 📦 PAGINATION HELPER
// =========================================
const paginate = (array, page = 1, limit = 10) => {

  const start = (page - 1) * limit;
  const end = start + limit;

  return array.slice(start, end);
};


// =========================================
// 🔍 SEARCH FILTER
// =========================================
const searchFilter = (items, keyword) => {

  if (!keyword) return items;

  return items.filter(item =>
    item.name.toLowerCase().includes(
      keyword.toLowerCase()
    )
  );
};


// =========================================
// 📤 EXPORT MODULES
// =========================================
module.exports = {

  formatCurrency,
  formatDate,
  generateId,
  calculateCartTotal,
  applyDiscount,
  validateEmail,
  maskCardNumber,
  getOrderStatusColor,
  capitalize,
  paginate,
  searchFilter

};