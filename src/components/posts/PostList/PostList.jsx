import React from "react";
import "./PostList.css";
import Card from "../../user/card/Card";
import PostItem from "../PostItem/PostItem";
import Button from "../../Elements/Button/Button";

const PostList = (p) => {
  if (p.items.length === 0) {
    return (
      <div className="post-list">
        <Card>
          <h2>No post found!</h2>
          <Button to="posts/new">Share</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {p.items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image= "https://i.imgur.com/Q2IMBBU.jpeg"
          title={post.title}
          description={post.description}
          address={post.address}
          creator={post.creator}
          coordinates={post.location}
          onDelete={p.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default PostList;
