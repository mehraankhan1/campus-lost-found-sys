// frontend/src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Your backend server

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach role/email from localStorage to every request
api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  if (role) config.headers["x-role"] = role;
  if (email) config.headers["x-email"] = email;
  return config;
});

// ------------------ Item APIs ------------------
export const itemAPI = {
  // GET all items (READ)
  getAllItems: () => api.get("/items"),

  // POST create new item (CREATE)
  createItem: (itemData) => api.post("/items", itemData),

  // DELETE item by ID (DELETE) - Admin only
  deleteItem: (id) => api.delete(`/items/${id}`),

  // POST match items (Extended epic)
  matchItems: (matchData) => api.post("/match", matchData),
};

// ------------------ Claim APIs ------------------
export const claimAPI = {
  // POST create claim (CREATE)
  createClaim: (claimData) => api.post("/claims", claimData),

  // PUT approve claim (UPDATE) - Admin only
  approveClaim: (id) => api.put(`/claims/${id}/approve`),
};

// ------------------ Admin APIs ------------------
export const adminAPI = {
  // GET all lost items (Admin only)
  getLostItems: () => api.get("/admin/lost-items"),

  // GET all claim requests (Admin only)
  getClaims: () => api.get("/admin/claims"),
};

export default api;
