"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { pages } from "next/dist/build/templates/app-page";

interface Post {
  id: number;
  title: string;
  author: string;
}
const URL = "http://localhost:3001/posts";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  function handleChangedPage(id: number) {
    setPage(id);
  }

  async function getPosts() {
    const response = await fetch(
      URL + "?id_gte=" + (10 * page - 9) + "&id_lte=" + 10 * page
    );
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  });

  return (
    <div>
      <h1>Posts Page</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} id={post.id.toString()} className="post">
              <h2>{post.title}</h2>
              <p>{post.author}</p>
              <p>{post.id}</p>
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} onClick={handleChangedPage} />
    </div>
  );
}
