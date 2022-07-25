import React, { useContext, useState, useEffect } from "react";

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

const AuthContext = React.createContext<any | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}
type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  function signup(email: any, password: any, firstName: any, lastName: any) {
    const create = createUserAccount({ email, password, firstName, lastName });
    return create;
  }

  const login = async (email: any, password: any) => {
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

  function resetPassword(email: any) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: any) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password: any) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
