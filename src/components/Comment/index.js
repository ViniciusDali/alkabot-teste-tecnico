import React from "react";
import Avatar from "react-avatar";
import styles from "../../styles/Comment.module.css";

export default function Comment(props) {
  return (
    <main className={styles.mainComment}>
      <Avatar name={props.name} round size="50" />

      <div className={styles.data}>
        <span className={styles.name}>{props.name}</span>
        <p className={styles.body}>{props.body}</p>
      </div>
    </main>
  );
}
