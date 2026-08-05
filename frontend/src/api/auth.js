import axios from "axios";

const auth = axios.create({
  baseURL: "http://127.0.0.1:5000/api/auth",
});

export default auth;