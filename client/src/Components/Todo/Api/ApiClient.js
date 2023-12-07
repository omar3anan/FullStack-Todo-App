import axios from "axios";
const API_URL = "http://localhost:5000";
//talama 7atet Spring-Secuirty
//lazem t7ot el basic Token
export const apiClient = axios.create({
  baseURL: API_URL,
});
