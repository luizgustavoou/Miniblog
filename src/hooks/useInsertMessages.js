import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, collection, addDoc, Timestamp, setDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_MESSAGE":
      return { loading: false, error: null };

    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const useInsertMessage = () => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertMessage = async (id) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newMessage = {
        createdAt: Timestamp.now(),
        message: "teste message",
      };

      const collectionRef = await collection(db, "posts", id, "room");

      const insertedMessage = await addDoc(collectionRef, newMessage);

      console.log("insertedMessage => ", insertedMessage);
      insertMessage.checkCancelBeforeDispatch({
        type: "INSERTED_MESSAGE",
        payload: insertedMessage,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    insertMessage,
    response,
  };
};
