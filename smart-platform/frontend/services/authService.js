async function login(email, password) {
  const data = await request("/users/login", "POST", {
    email,
    password
  });

  localStorage.setItem("token", data.token);
  alert("Login Success");
}

async function register(name, email, password) {
  const data = await request("/users/register", "POST", {
    name,
    email,
    password
  });

  alert("Registered Successfully");
  return data;
}