import api from "./api";

const getStore = () => {
  return api.get("/stores/");
};

const createStore = (data) => {
  return api.post("/stores/", data);
};

export default {
  getStore,
  createStore,
};