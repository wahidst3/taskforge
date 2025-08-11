
import { createContext, useContext, useEffect, useState } from "react";
import { loadLists, saveLists } from "./storage"; // your code above
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLists([]);
        setLoading(false);
        return;
      }

      // Load user's lists from Firestore
      const loadedLists = await loadLists();
      setLists(loadedLists || []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Save and update lists in state
  const updateLists = (updater) => {
    setLists((prev) => {
      const newLists = typeof updater === "function" ? updater(prev) : updater;
      saveLists(newLists);
      return newLists;
    });
  };

  return (
    <ListsContext.Provider value={{ lists, setLists: updateLists, loading }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => useContext(ListsContext);
