import axios from "axios";

const API = axios.create({
  baseURL: "https://atmapplication.onrender.com/api/users",
});

export const login = (accountNumber, pin) =>
  API.post("/login", { accountNumber, pin });

export const register = (accountNumber, name, pin) =>
  API.post("/register", { accountNumber, name, pin });

export default API;