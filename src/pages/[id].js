import { PageTemplate } from "@/components/PageTemplate";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Post() {
  const [comments, setComments] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const post = data.find((p) => p.id == id);

        setPost(post);
      } catch (erro) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchPostComents = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        setComments(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    fetchPostComents();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (post && comments) {
    return (
      <PageTemplate
        userId={post.userId}
        title={post.title}
        body={post.body}
        comments={comments}
      />
    );
  }

  return <h1>Carregando</h1>;
}
