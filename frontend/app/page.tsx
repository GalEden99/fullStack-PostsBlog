"use client";

import React, { use, useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import axios, { formToJSON } from "axios";
import ThemeButton from "./components/ThemeButton";
import NewPostForm from "./components/NewPostForm";

interface Post {
  id: number;
  title: string;
  author: { name: string; email: string } | null;
  content: string;
}

const URL = "http://localhost:3001/notes";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [addPost, setAddPost] = useState(false);
  const [editPost, setEditPost] = useState<{ [key: number]: boolean }>({});
  const [deletePost, setDeletePost] = useState<{ [key: number]: boolean }>({});
  const [newFormData, setNewFormData] = useState({
    title: "",
    name: "",
    email: "",
    content: "",
  });
  const [editFormData, setEditFormData] = useState<{
    [key: number]: { content: string };
  }>({});

  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  type ActionType = "save" | "cancel" | "edit" | "add";

  function handleChangedPage(id: number) {
    setPage(id);
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    handleAddPostClick("add", newFormData);
  }

  const handleChangeNewForm = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleAddPostClick(actionType: "add" | "cancel", newFormData?: any) {
    if (!addPost) {
      setAddPost(!addPost);
    } else if (actionType === "cancel") {
      setAddPost(!addPost);
    } else if (actionType === "add") {
      const form = document.getElementById("newPostForm") as HTMLFormElement;
      if (form && form.checkValidity()) {
        setIsAddingPost(true);

        axios
          .post(URL, {
            title: newFormData.title,
            author: { name: newFormData.name, email: newFormData.email },
            content: newFormData.content,
          })
          .then((response) => {
            console.log("response: ", response);
            setEditFormData((prevState) => ({
              ...prevState,
              [response.data.id]: { content: response.data.content },
            }));

            setPosts((prevPosts) => {
              const newPosts = [...prevPosts, response.data];

              if (newPosts.length === 11) {
                handleChangedPage(page + 1);
              }

              return newPosts;
            });

            setAddPost(!addPost);
            setIsAddingPost(false);

            setNewFormData({
              title: "",
              name: "",
              email: "",
              content: "",
            });
          })
          .catch((err) => setError(err.message));
      }
    }
  }

  function handleEditPost(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    content: string
  ) {
    event.preventDefault();
    setEditPost((prev) => ({ ...prev, [id]: true }));
    setEditFormData((prevState) => ({
      ...prevState,
      [id]: { content: content },
    }));
  }

  function handleSaveEditPost(id: number) {
    const updatedContent = editFormData[id].content;
    setIsEditingPost(true);

    axios
      .put(`${URL}/${id}`, { content: updatedContent })
      .then((response) => {
        console.log("response: ", response);
        setEditPost((prev) => ({ ...prev, [id]: false }));
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, content: updatedContent } : post
          )
        );
        setIsEditingPost(false);
      })
      .catch((err) => setError(err.message));
  }

  function handleDeletePost(id: number) {
    setDeletePost((prev) => ({ ...prev, [id]: true }));

    axios
      .delete(`${URL}/${id}`)
      .then((response) => {
        console.log("response: ", response);

        setPosts((prevPosts) => {
          const newPosts = prevPosts.filter((post) => post.id !== id);

          if (newPosts.length === 1 && page > 1) {
            handleChangedPage(page - 1);
          }

          return newPosts;
        });

        setDeletePost((prev) => ({ ...prev, [id]: false }));

        setEditPost((prevEditPost) => {
          const newEditPost = { ...prevEditPost };
          delete newEditPost[id];
          return newEditPost;
        });

        setEditFormData((prevEditFormData) => {
          const newEditFormData = { ...prevEditFormData };
          delete newEditFormData[id];
          return newEditFormData;
        });
      })
      .catch((err) => setError(err.message));
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
        setMaxPage(Math.ceil(response.data.totalNotes / 10));
        setPosts(response.data.notes);
      })
      .catch((err) => setError(err.message));
  }, [page, isAddingPost, isEditingPost, deletePost]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  return (
    <div>
      <ThemeButton
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        text={isDarkTheme ? "☀" : "🔆"}
      />

      <h1>Posts Page</h1>
      <Pagination
        className="topPagination"
        page={page}
        onClick={handleChangedPage}
        numPages={maxPage}
      />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="addPost-container">
            {!addPost ? (
              <button
                onClick={() => handleAddPostClick("add")}
                className="add_new_note"
                name="add_new_note"
              >
                📄
                {" Add new note"}
              </button>
            ) : (
              <div>
                <h1>New Post</h1>
                <NewPostForm
                  handleSubmit={handleSubmit}
                  handleChangeNewForm={handleChangeNewForm}
                  handleAddPostClick={handleAddPostClick}
                  handleCancel={() => handleAddPostClick("cancel")}
                />
              </div>
            )}
            <br />
          </div>
          <div className="container">
            {posts.map((post, index) => (
              <div
                className="note"
                id={(page - 1) * 10 + (index + 1).toString()}
              >
                <div className="postButtonContainer">
                  {!editPost[(page - 1) * 10 + (index + 1)] ? (
                    <button
                      className={`edit-${(page - 1) * 10 + (index + 1)}`}
                      name={`edit-${(page - 1) * 10 + (index + 1)}`}
                      onClick={(e) =>
                        handleEditPost(
                          e,
                          (page - 1) * 10 + (index + 1),
                          post.content
                        )
                      }
                    >
                      🖋
                      {" Edit"}
                    </button>
                  ) : (
                    <div>
                      <form id={`editForm-${(page - 1) * 10 + (index + 1)}`}>
                        <textarea
                          className={`text_input-${
                            (page - 1) * 10 + (index + 1)
                          }`}
                          name={`text_input-${(page - 1) * 10 + (index + 1)}`}
                          placeholder="*Content"
                          value={
                            editFormData[(page - 1) * 10 + (index + 1)]
                              ?.content ?? ""
                          }
                          onChange={(e) =>
                            setEditFormData((prevState) => ({
                              ...prevState,
                              [(page - 1) * 10 + (index + 1)]: {
                                content: e.target.value,
                              },
                            }))
                          }
                          required
                        />
                      </form>
                      <button
                        className={`text_input_save-${
                          (page - 1) * 10 + (index + 1)
                        }`}
                        name={`text_input_save-${
                          (page - 1) * 10 + (index + 1)
                        }`}
                        onClick={() =>
                          handleSaveEditPost((page - 1) * 10 + (index + 1))
                        }
                      >
                        Save
                      </button>
                      <button
                        className={`text_input_cancel-${
                          (page - 1) * 10 + (index + 1)
                        }`}
                        name={`text_input_cancel-${
                          (page - 1) * 10 + (index + 1)
                        }`}
                        onClick={() =>
                          setEditPost((prev) => ({
                            ...prev,
                            [(page - 1) * 10 + (index + 1)]: false,
                          }))
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <button
                    className={`delete-${(page - 1) * 10 + (index + 1)}`}
                    name={`delete-${(page - 1) * 10 + (index + 1)}`}
                    onClick={() =>
                      handleDeletePost((page - 1) * 10 + (index + 1))
                    }
                  >
                    🗑
                    {" Delete"}
                  </button>
                </div>
                <div className="postContentContainer">
                  <h2>Title: {post.title}</h2>

                  <div className="postInfo">
                    {post.author?.name && (
                      <small className="small-container">
                        <div className="svg-container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                              fill-rule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                          </svg>
                        </div>
                        Author: {post.author?.name}
                      </small>
                    )}
                    {post.author?.email && (
                      <small className="small-container">
                        <div className="svg-container">✉︎</div>
                        Email: {post.author?.email}
                      </small>
                    )}
                  </div>
                  <br />
                  <small>Content: {post.content}</small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Pagination
        className="bottomPagination"
        page={page}
        onClick={handleChangedPage}
        numPages={maxPage}
      />
    </div>
  );
}
