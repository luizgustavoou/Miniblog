// CSS
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        Sobre o mini <span>Blog</span>
      </h1>
      <p>
        Este projeto consiste em um blog feito com React no frontend e Firebase
        no backend
      </p>
      <Link to="/post/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;
