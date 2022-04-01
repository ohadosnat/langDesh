import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, database } from "./firebaseConfig";

/**
 * Creates a new user inside Firesbase and creates a new user document inside Firestore
 * @param email - Email Address
 * @param password - Password
 * @param name - User's Name
 */
export const signup = async (email: string, password: string, name: string) => {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password);
  const userDocument: UserDoc = {
    name,
    uid: userCreds.user.uid,
    soundEffects: true,
    progress: {
      course150: [],
      course51100: [],
      course101153: [],
      course154207: [],
    },
    activeLangs: [],
  };
  await setDoc(doc(database, "users", userCreds.user.uid), userDocument);
};

/**
 * Signs in a user
 * @param email - Email Address
 * @param password - Password
 * @returns - User Credentials Object
 */
export const signin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
