import styles from "./Modal.module.css";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { useFetchComments } from "../hooks/useFetchComments";

const Modal = ({ handleClose, post, handleActionComment }) => {
  const [message, setMessage] = useState("");
  const { comments, loading, error } = useFetchComments("posts", post.id);

  const handleClickButton = () => {
    handleActionComment(message);
    setMessage("");
  };

  return (
    <div className={styles.fade}>
      <div className={styles.modal}>
        {loading && <p>Carregando comentários...</p>}
        {!loading && (
          <>
            <div className={styles.header}>
              <h2>{post.title}</h2>
              <button onClick={handleClose}>
                <AiOutlineClose></AiOutlineClose>
              </button>
            </div>
            <div className={styles.main}>
              {comments && comments.length == 0 && (
                <div className={styles.container_error}>
                  Seja o primeiro a comentar!
                </div>
              )}

              <div className={styles.comments}>
                {comments &&
                  comments.map((comment) => (
                    <div className={styles.box_comment} key={comment.id}>
                      <span className={styles.user}>{comment.commentedBy}</span>
                      <span>{comment.message}</span>
                    </div>
                  ))}
              </div>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
