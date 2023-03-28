import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import axios from "axios";
import Link from "next/link";
import styles from "@/styles/blog.module.css";
import Comment from "../Comment";

const quicksand = Quicksand({ subsets: ["latin"] });

export function PageTemplate(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  console.log(users, props);
  return (
    <main id={styles.mainContent} className={quicksand.className}>
      <div className={styles.postCard}>
        <h1 className={styles.postTitle}>{props.title}</h1>

        <span className={styles.postAuthor}>
          Escrito por {users.find((user) => user.id === props.userId)?.name}
        </span>

        <p className={styles.postContent}>{props.body}</p>

        <span
          onClick={() => setShowComments(!showComments)}
          className={styles.postLink}
        >
          {showComments ? "Esconder comentários" : "Ver comentários"}
        </span>
        <div className={styles.Comment}>
          {showComments &&
            props.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  name={comment.name}
                  body={comment.body}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
