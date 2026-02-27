const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/users`;

const register = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  
  const json = await res.json();   

  if (!res.ok) {
    console.log(json);   
    throw new Error(json.message || "Registration failed");
  }
  return json;
};

const login = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();  
  if (!res.ok) throw new Error(json.message || "Login failed");
  return json;
};

export const AuthService = {
  register,
  login
};