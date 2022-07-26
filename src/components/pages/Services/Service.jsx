import React from "react";
import { Link } from "react-router-dom";
import styles from "./Services.module.css";

function Service({ item }) {
  return (
    <div
      style={{
        backgroundImage: `url(${`http://localhost:4000${item.img}`})`,
      
      }}
      className={styles.services_content}
    >
      <div className={styles.title_and_btn}>
        <div className={styles.element_title}>{item.title}</div>
        <div className={styles.element_button}>
            <button className={styles.btn}><Link to="/servic"> Подробнее</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Service;