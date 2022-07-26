import axios from "axios";
import { Portfolio } from "../../../types/portfolio";

import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const initBackend = async () => {
  try {
    await axios.post(`${API}/`);
  } catch (e) {
    return e;
  }
};
