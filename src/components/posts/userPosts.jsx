import React, { useEffect, useState } from "react";
import PostList from "./PostList/PostList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../Elements/Hook/http-hook";
import ErrorModal from "../Elements/Error/ErrorModal";
import LoadingSpinner from "../Elements/Loading/LoadingSpinner";

const UserPosts = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/posts/user/${userId}`
        );
        setLoadedPosts(responseData.posts);
      } catch (error) {}
    };
    fetchPosts();
  }, [sendRequest]);

  const postDeleteHandler = (deletedPostId) => {
    setLoadedPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPosts && (
        <PostList items={loadedPosts} onDeletePost={postDeleteHandler} />
      )}
    </>
  );
};

export default UserPosts;
