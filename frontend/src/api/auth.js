export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response) {
      throw new Error(response.status, response.message);
    }
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function signup(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response) {
      throw new Error(response.status, response.message);
    }
    const data = await response.json();
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
}
