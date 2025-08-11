// utils/storage.js
// export const loadLists = () => JSON.parse(localStorage.getItem("lists") || "[]");
// export const saveLists = (lists) =>
//   localStorage.setItem("lists", JSON.stringify(lists));

import { db } from './firebase'; // Your Firebase initialization file
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Get the current user's ID
const getUserId = () => {
  const auth = getAuth();
  return auth.currentUser?.uid;
};

// Load lists from Firestore
export const loadLists = async () => {
  const userId = getUserId();
  if (!userId) return []; // Return empty array if no user is logged in

  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data().lists || [];
    }
    return [];
  } catch (error) {
    console.error("Error loading lists:", error);
    return [];
  }
};

// Save lists to Firestore
export const saveLists = async (lists) => {
  const userId = getUserId();
  if (!userId) {
    console.error("No user logged in - cannot save lists");
    return;
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { lists }, { merge: true });
  } catch (error) {
    console.error("Error saving lists:", error);
  }
};