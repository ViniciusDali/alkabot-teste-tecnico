import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";
import axios from "axios";
import { Header } from "@/components/Header";
import Avatar from "react-avatar";
import styles from "../../styles/user.module.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        setUser(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);
  if (!user) {
    return <p>Carregando...</p>;
  }
  console.log(user);
  return (
    <main id={styles.mainContent} className={quicksand.className}>
      <Header />
      <div className={styles.container}>
        <h1>Perfil do Usuário</h1>
        <div className={styles.row}>
          <Avatar name={user.username} round size="60" />
          <h2 className={styles.name}>{user.username}</h2>
        </div>
        <div className={styles.column}>
          <span className={styles.description}>Nome Completo</span>
          <span className={styles.value}>{user.name}</span>
        </div>

        <div className={styles.column}>
          <span className={styles.description}>E-mail</span>
          <span className={styles.value}>{user?.email}</span>
        </div>

        <div className={styles.column}>
          <span className={styles.description}>Endereço</span>
          <span
            className={styles.value}
          >{`${user?.address?.street}, ${user?.address?.suite}, ${user?.address?.city}, ${user?.address?.zipcode}`}</span>
        </div>

        <div className={styles.column}>
          <span className={styles.description}>Telefone</span>
          <span className={styles.value}>{user?.phone}</span>
        </div>

        <div className={styles.column}>
          <span className={styles.description}>Website</span>
          <a href={user?.website} className={styles.value}>
            {user?.website}
          </a>
        </div>

        <div className={styles.column}>
          <span className={styles.description}>Empresa</span>
          <span className={styles.value}>{user?.company.name}</span>
        </div>
      </div>
    </main>
  );
}
