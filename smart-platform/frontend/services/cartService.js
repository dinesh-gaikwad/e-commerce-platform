async function addToCart(productId) {
  const token = localStorage.getItem("token");

  const res = await request("/cart/add", "POST", {
    productId,
    quantity: 1
  }, token);

  alert("Added to cart");
  return res;
}

async function loadCart() {
  const token = localStorage.getItem("token");

  const data = await request("/cart", "GET", null, token);

  const container = document.getElementById("cart");

  container.innerHTML = data.cart.items.map(i => `
    <div>
      <h3>${i.name}</h3>
      <p>Qty: ${i.quantity}</p>
    </div>
  `).join("");
}