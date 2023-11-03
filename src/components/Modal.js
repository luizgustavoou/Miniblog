import styles from "./Modal.module.css";

const Modal = ({ obj }) => {
  return (
    <>
      <div className={styles.fade}></div>

      <div className={styles.modal}>
        <div className={styles.header}>{obj.header}</div>
        <div className={styles.main}>{obj.main}</div>
        <div className={styles.footer}>{obj.footer}</div>
      </div>
    </>
  );
};

export default Modal;
