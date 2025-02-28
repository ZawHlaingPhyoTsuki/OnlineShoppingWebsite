import axios from "axios";

const BASE_URL = "https://moonappleonlineshop.vercel.app/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
