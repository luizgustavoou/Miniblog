import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
  collectionGroup,
  getDocs,
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
        let querySnapshot;

        // busca

        // dashboard
        if (search) {
          querySnapshot = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          querySnapshot = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          querySnapshot = await query(
            collectionRef,
            orderBy("createdAt", "desc")
          );
        }

        await onSnapshot(querySnapshot, (querySnapshot) => {
          const docs = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              ...data,
            };
          });

          setDocuments(docs);
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
