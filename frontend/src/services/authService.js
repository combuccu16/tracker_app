export async function login(email, password) {
  // wxe doing this with await
  try{

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  }catch (error) {
    console.error("Login failed:", error);
    return { msg: "Login failed. Please try again." };
  }
}

export async function signup(name, lastname, email, password) {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, lastname, email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Signup failed:", error);
    return { msg: "Signup failed. Please try again." };
  }
}