import axios from "axios";
import { Portfolio } from "../../../types/portfolio";

import { getIdToken } from "../../firebase";

const API = process.env.REACT_APP_API;

/** Create */
export const createPortfolio = async (portfolio: Portfolio) => {
  try {
    const token = await getIdToken();
    if (token) {
      const data = await axios.post(`${API}/portfolio`, portfolio, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};

/** Edit */
export const editPortfolio = async (id: string, portfolio: Portfolio) => {
  try {
    const token = await getIdToken();
    if (token) {
      const data = await axios.put(`${API}/portfolio/${id}`, portfolio, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};

/** Get */
export const getAllPortfoliosByUser = async () => {
  try {
    const token = await getIdToken();
    if (token) {
      const data = await axios.get(`${API}/portfolio/list`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};

export const getPortfolioById = async (portfolioId: number) => {
  try {
    const token = await getIdToken();
    if (token) {
      const data = await axios.get(`${API}/portfolio/${portfolioId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};

/** Delete */
export const deletePortfolio = async (portfolioId: string) => {
  try {
    const token = await getIdToken();
    if (token) {
      const data = await axios.get(`${API}/portfolio/${portfolioId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      return data;
    } else {
      throw new Error("Must be logged in");
    }
  } catch (e) {
    return e;
  }
};
