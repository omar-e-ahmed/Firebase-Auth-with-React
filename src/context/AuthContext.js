import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  getIdToken,
} from "firebase/auth";

import { createUserAccount } from "../controller/auth/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, firstName, lastName) {
    const create = createUserAccount({ email, password, firstName, lastName });
    return create;
  }

  const login = async (email, password) => {
    try {
      const loginReq = await signInWithEmailAndPassword(auth, email, password);
      return loginReq;
    } catch (e) {
      return e;
    }
  };

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
