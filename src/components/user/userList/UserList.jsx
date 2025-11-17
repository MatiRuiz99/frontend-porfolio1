import React from "react";
import UserItem from "../userItem/UserItem";
import "./UsersList.css";
import Card from "../card/Card";

const UserList = (p) => {
  if (p.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No user found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {p.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            postCount={user.posts.length}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
