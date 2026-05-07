async function loadProducts() {
  const data = await request("/products");

  const container = document.getElementById("products");

  container.innerHTML = data.products.map(p => `
    <div style="border:1px solid #ccc;padding:10px;margin:10px;">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    </div>
  `).join("");
}