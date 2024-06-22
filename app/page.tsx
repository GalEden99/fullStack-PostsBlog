"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { pages } from "next/dist/build/templates/app-page";

import axios from "axios";

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
  const [maxPage, setMaxPage] = useState(0);

  function handleChangedPage(id: number) {
    setPage(id);
  }

  useEffect(() => {
    const promise = axios.get(URL, {
      params: {
        _page: page,
        _per_page: 10,
      },
    });
    promise
      .then((response) => {
        console.log(response);
        setMaxPage(Math.ceil(response.headers["x-total-count"] / 10));
        setPosts(response.data);
      })
      .catch((err) => setError(err.message));
  }, [page]);

  return (
    <div>
      <h1>Posts Page</h1>
      <Pagination className="topPagination" page={page} onClick={handleChangedPage} numPages={maxPage}  />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="container">
          {posts.map((post) => (
            <div className="post" id={post.id.toString()}>
              <h2>{post.title}</h2>
              <small>{post.author}</small>
              <br />
              Content for note {post.id}
            </div>
          ))}
        </div>
      )}
      <Pagination className="bottomPagination" page={page} onClick={handleChangedPage} numPages={maxPage} />
    </div>
  );
}
