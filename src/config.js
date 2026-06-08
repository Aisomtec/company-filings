// src/config.js
// Centralized configuration for API endpoints. Resolves local backend port vs production domain automatically.

export const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:8000/backend/api"
  : `${window.location.origin}/backend/api`;
