import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../utils/firebaseConfig";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserDoc, setCurrentUserDoc] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserDoc = async (uid) => {
    const req = await database.users.doc(uid).get();
    const data = req.data();
    setCurrentUserDoc(data);
  };

  const signup = async (email, password, name) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        database.users.doc(userCredential.user.uid).set({
          name,
          uid: userCredential.user.uid,
          soundEffects: true,
          progress: {
            course150: [],
            course51100: [],
            course101153: [],
            course154207: [],
          },
          activeLangs: [],
        });
      });
  };

  const logout = () => {
    return auth.signOut().then(setCurrentUserDoc());
  };

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      user && getUserDoc(user.uid);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const updateSettings = async (type, value, uid) => {
    if (type === "sound") {
      await database.users.doc(uid).update({
        soundEffects: value,
      });
      getUserDoc(uid);
    }
  };

  const value = {
    currentUser,
    currentUserDoc,
    logout,
    signup,
    signin,
    getUserDoc,
    updateSettings,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
