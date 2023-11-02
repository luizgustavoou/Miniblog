import { useInsertMessage } from "../hooks/useInsertMessages";
import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";

import { dateFormatted } from "../utils/formatData";

const PostDetail = ({ post }) => {
  const { insertMessage } = useInsertMessage();

  return (
    <div className={styles.post_detail}>
      <h2 className={styles.createdBy}>{post.createdBy}</h2>
      <span className={styles.createdAt}>
        {dateFormatted(post.createdAt.seconds)}
      </span>
      <h2>{post.title}</h2>
      <p className={styles.body}>{post.body}</p>
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
        <button
          onClick={() => insertMessage(post.id)}
          className="btn btn-outline btn-danger"
        >
          Comentários
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
