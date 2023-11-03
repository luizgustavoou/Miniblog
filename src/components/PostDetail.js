import styles from "./PostDetail.module.css";
import { dateFormatted } from "../utils/formatData";
import { useState } from "react";
import Comments from "./Comments";

const PostDetail = ({ post }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.post_detail}>
      <div className={styles.header}>
        <h2 className={styles.createdBy}>{post.createdBy}</h2>
        <span className={styles.createdAt}>
          {dateFormatted(post.createdAt.seconds)}
        </span>
      </div>
      <div className={styles.body}>
        <h2>{post.title}</h2>
        <p className={styles.content}>{post.body}</p>
        <img src={post.image} alt={post.title} />
        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        <div className={styles.actions}>
          {/* <Link to={`post/${post.id}`} className="btn btn-outline">

          Ler
        </Link> */}
          <button onClick={toggleModal} className="btn btn-outline btn-danger">
            Comentários
          </button>
        </div>
      </div>
      {open && (
        <Comments post={post} open={open} toggleModal={toggleModal}></Comments>
      )}
    </div>
  );
};

export default PostDetail;
