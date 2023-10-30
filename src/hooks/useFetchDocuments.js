import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
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

      const collectionRef = await collection(db, docCollection);

      try {
        let myQuery;

        // busca

        // dashboard
        if (search) {
          myQuery = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          myQuery = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          myQuery = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(myQuery, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log({ error });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    documents,
    loading,
    error,
  };
};
