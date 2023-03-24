import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
    <div>
      <Link href="/">Voltar</Link>
      <h1>{props.title}</h1>

      <span>
        Escrito por {users.find((user) => user.id === props.userId)?.name}
      </span>

      <p>{props.body}</p>

      <span onClick={() => setShowComments(true)}>Ver comentários</span>

      {showComments &&
        props.comments.map((comment) => {
          return (
            <div key={comment.id}>
              <span>{comment.name}</span>
              <span>{comment.email}</span>
              <span>{comment.body}</span>
            </div>
          );
        })}
    </div>
  );
}
