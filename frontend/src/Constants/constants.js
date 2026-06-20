export const SERVER_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "http://127.0.0.1:8000/api"
  : "https://socialhub.onrender.com/api";

