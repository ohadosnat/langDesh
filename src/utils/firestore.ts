import { doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";
/**
 * Updates a document inside the given collection in `Firestore` database with the provided data.
 * @param collection - the collection that will be updated
 * @param reference - the document ID that will be updated
 * @param data - the data that will be updated.
 * @example updateUserDoc(users, uid, {theme: "dark"})
 */
export const updateDocumentInCollection = async (
  collection: string,
  reference: string,
  data: any
): Promise<void> => {
  const dofRef = doc(database, collection, reference);
  try {
    await updateDoc(dofRef, data);
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message: `An error occured while updating ${reference} at ${collection}`,
      error,
    };
    console.error(errorMessage);
  }
};
