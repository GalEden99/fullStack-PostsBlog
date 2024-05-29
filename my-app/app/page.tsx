"use client";

import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  author: string;
}

async function getPosts() {
  const response = await fetch("http://localhost:3001/posts");
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Posts Page</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
