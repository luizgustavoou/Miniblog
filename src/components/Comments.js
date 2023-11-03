import styles from "./Comments.module.css";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { useFetchComments } from "../hooks/useFetchComments";
import { useInsertMessage } from "../hooks/useInsertMessages";
import { useAuthValue } from "../context/AuthContext";
import Modal from "./Modal";

const Comment = ({ post, open, toggleModal }) => {
  const { comments, loading, error } = useFetchComments("posts", post.id);
  const { insertMessage } = useInsertMessage();
  const { user } = useAuthValue();

  const [message, setMessage] = useState("");

  const handleActionComment = async (message) => {
    await insertMessage(post.id, message, user.uid, user.displayName);
  };

  const handleClickButton = () => {
    handleActionComment(message);
    setMessage("");
  };

  const header = () => {
    return (
      <>
        <h2>{post.title}</h2>
        <button onClick={toggleModal}>
          <AiOutlineClose></AiOutlineClose>
        </button>
      </>
    );
  };

  const main = () => {
    return (
      <>
        {comments && comments.length === 0 && (
          <div className={styles.container_error}>
            Seja o primeiro a comentar!
          </div>
        )}

        {comments &&
          comments.map((comment) => (
            <div className={styles.box_comment} key={comment.id}>
              <span className={styles.user}>{comment.commentedBy}</span>
              <span>{comment.message}</span>
            </div>
          ))}
      </>
    );
  };

  const footer = () => {
    return (
      <div className={styles.footer}>
        <textarea
          required
          type="text"
          placeholder="Comentar..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleClickButton}>
          <AiOutlineSend></AiOutlineSend>
        </button>
      </div>
    );
  };

  return (
    <>
      {open && (
        <Modal
          obj={{ header: header(), main: main(), footer: footer() }}
        ></Modal>
      )}
    </>
  );
};

export default Comment;
