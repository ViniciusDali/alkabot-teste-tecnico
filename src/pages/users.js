import { Quicksand } from "next/font/google";
import styles from "@/styles/users.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";
import Avatar from "react-avatar";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <main className={quicksand.className} id={styles.container}>
      <Header />
      <div className={styles.userList}>
        <h1>Lista de Usuários</h1>

        <ul className={styles.users}>
          {users.map((user) => {
            return (
              <li key={user.id} className={styles.mainComment}>
                <Link href={`users/${user.id}`}>
                  <Avatar name={user.name} round size="50" />
                  <span className={styles.name}>{user.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
