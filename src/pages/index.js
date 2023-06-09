import Head from "next/head";
import { Quicksand } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(data);
      } catch (erro) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(data);
      } catch (erro) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Alkabot Teste Técnico</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main id={styles.mainContent} className={quicksand.className}>
        <h1>Olá, Anônimo</h1>
        {posts.map((post) => {
          return (
            <Link
              href={`posts/${post.id}`}
              key={post.id}
              className={styles.postCard}
            >
              <h2 className={styles.postTitle}>{post.title}</h2>

              <span className={styles.postAuthor}>
                Escrito por{" "}
                {users.find((user) => user.id === post.userId)?.name}
              </span>

              <p className={styles.postContent}>{post.body}</p>
            </Link>
          );
        })}
      </main>
    </>
  );
}
