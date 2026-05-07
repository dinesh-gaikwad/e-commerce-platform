async function placeOrder() {
  const token = localStorage.getItem("token");

  const data = await request("/orders", "POST", {}, token);

  alert("Order placed!");
  return data;
}