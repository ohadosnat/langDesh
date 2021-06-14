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
          progress: {
            course150: [
              { id: "a4fd7810", ita_strength: 0, rus_strength: 0 },
              { id: "bf5460f8", ita_strength: 0, rus_strength: 0 },
            ],
            course51100: [],
            course101150: [],
            course151207: [],
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

  const value = {
    currentUser,
    currentUserDoc,
    logout,
    signup,
    signin,
    getUserDoc,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
