const request = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const registerUser = (form) => request("/api/auth/register", "POST", form);
export const loginUser = (form) => request("/api/auth/login", "POST", form);
export const getTasks = () => request("/api/tasks");
export const createTask = (title) => request("/api/tasks", "POST", { title });
export const updateTask = (id, updates) => request(`/api/tasks/${id}`, "PUT", updates);
export const deleteTask = (id) => request(`/api/tasks/${id}`, "DELETE");
