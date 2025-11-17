import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar.jsx";
import Card from "../card/Card.jsx";
import "./UserItem.css";

const UserItem = (p) => {
  return (
    <li className="user-item">
      <Card className="user-item_content">
        <Link to={`/${p.id}/posts`}>
          <div className="user-item_image">
            <Avatar
              image={`${import.meta.env.VITE_BACKENDIMAGE_URL}/${p.image}`}
              alt={p.name}
            />
          </div>
          <div className="user-item_info">
            <h2>{p.name}</h2>
            <h3>
              {p.postCount} {p.postCount === 1 ? "Post" : "Posts"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
