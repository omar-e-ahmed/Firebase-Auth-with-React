import axios from "axios";

const API = process.env.REACT_APP_API;

export const initBackend = async () => {
  try {
    await axios.post(`${API}/`);
  } catch (e) {}
};
