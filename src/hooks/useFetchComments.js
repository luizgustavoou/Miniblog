import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const useFetchComments = (docCollection, docId) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeLoad = () => {
    if (cancelled) return;
  };

  useEffect(() => {
    async function loadData() {
      checkCancelBeforeLoad();

      setLoading(true);

      const collectionRef = await collection(db, docCollection, docId, "room");

      try {
        let myQuery = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(myQuery, (querySnapshot) => {
          const docs = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              ...data,
            };
          });

          setComments(docs);
        });
      } catch (error) {
        console.log({ error });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, docId, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    comments,
    loading,
    error,
  };
};
