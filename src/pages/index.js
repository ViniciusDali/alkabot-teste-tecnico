import Head from "next/head";
import { Quicksand } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

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
      <main className={styles.main}>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>

              <em>
                Escrito por{" "}
                {users.find((user) => user.id === post.userId)?.name}
              </em>

              <p>{post.body}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
