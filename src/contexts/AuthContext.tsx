import { onAuthStateChanged, signOut, User } from "@firebase/auth";
import { doc, getDoc, Unsubscribe } from "@firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, database } from "../utils/firebaseConfig";
import { updateDocumentInCollection } from "../utils/firestore";

const AuthContext = createContext<IuseAuth>({} as IuseAuth);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserDoc, setCurrentUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Get a user document based on the given `uid`. Also sets the `currentUserDoc` state to the fetched data.
   * @param uid - user's id (`uid`)
   */
  const getUserDoc = async (uid: string) => {
    const req = await getDoc(doc(database, "users", uid));
    const data = req.data() as UserDoc;
    setCurrentUserDoc(data);
  };

  /**
   * Update a setting inside the user's document (based on the given `uid`)
   * @param type - the type of update
   * @param value - the value we want to update
   * @param uid - the user's id (`uid`)
   */
  const updateSettings = async (type: string, value: unknown, uid: string) => {
    if (type === "sound") {
      await updateDocumentInCollection("users", uid, { soundEffects: value });
      await getUserDoc(uid);
    }
  };

  /** Logs out a user and sets the `currentUserDoc` state to `null` */
  const logout = () => {
    signOut(auth).then(() => setCurrentUserDoc(null));
  };

  // Fetch & Set the current user based on auth state change. - Auth Listener
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      user && getUserDoc(user.uid);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value: IuseAuth = {
    currentUser,
    currentUserDoc,
    logout,
    getUserDoc,
    updateSettings,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
