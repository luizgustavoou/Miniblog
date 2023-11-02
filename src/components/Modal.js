import styles from "./Modal.module.css";

const Modal = () => {
  const comments = [
    { user: "luiz", message: "kkkk" },
    { user: "jose", message: "legal!" },
    { user: "italo", message: "puts!!" },
    { user: "hugo", message: "parabens man succeso hehe xd :D" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
    { user: "lucas", message: "ugauga" },
  ];

  return (
    <div className={styles.box}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Post: O paraiso do mar</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.comments}>
            {comments &&
              comments.map((comment) => (
                <div className={styles.box_comment}>
                  <span className={styles.user}>{comment.user}</span>
                  <span>{comment.message}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.actions}>
          <input type="text" placeholder="Comentar..." />
        </div>
      </div>
    </div>
  );
};

export default Modal;
