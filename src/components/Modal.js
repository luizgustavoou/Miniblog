import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const Modal = ({ handleClose, title, handleActionComment, comments }) => {


  const [message, setMessage] = useState("");

  const handleClickButton = () => {
    handleActionComment(message);
    setMessage("");
  };
  return (
    <div className={styles.box}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={handleClose}>
            <AiOutlineClose></AiOutlineClose>
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.comments}>
            {comments &&
              comments.map((comment) => (
                <div className={styles.box_comment}>
                  <span className={styles.user}>{comment.commentedBy}</span>
                  <span>{comment.message}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button className="btn" onClick={handleClickButton}>
            Comentar
          </button>
          <input
            type="text"
            placeholder="Comentar..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
