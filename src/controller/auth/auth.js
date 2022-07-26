import axios from "axios";
// import { auth } from "../../firebase";
import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

export const createUserAccount = async (data) => {
  try {
    const create = await axios.post(`${API}/auth/register`, data);
    return create;
  } catch (e) {
    return e;
  }
};

export const fetchUserAccount = async () => {
  try {
    const token = await getIdToken();
    if (token) {
      const user = await axios.get(`${API}/auth/user`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return user;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};
