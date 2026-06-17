import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

export const login = (accountNumber, pin) =>
  API.post("/login", { accountNumber, pin });

export const register = (accountNumber, name, pin) =>
  API.post("/register", { accountNumber, name, pin });

export default API;