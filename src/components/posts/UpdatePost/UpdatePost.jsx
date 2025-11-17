import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../NewPost/NewPost.css";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Elements/Validator/validators";
import { useForm } from "../../Elements/Hook/form-hook";
import Card from "../../user/card/Card";
import { useHttpClient } from "../../Elements/Hook/http-hook";
import LoadingSpinner from "../../Elements/Loading/LoadingSpinner";
import ErrorModal from "../../Elements/Error/ErrorModal";
import { AuthContext } from "../../Elements/Context/auth-context";

const UpdatePost = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const postId = useParams().postId;
  const navigate = useNavigate();

  const [formState, InputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`
        );
        setLoadedPost(responseData.post);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, postId, setFormData]);

  const postUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/" + auth.userId + "/posts");
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPost && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find posts!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPost && (
        <form className="post-form" onSubmit={postUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={InputHandler}
            initialValue={loadedPost.title}
            initialValid={loadedPost.title.isValid}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={InputHandler}
            initialValue={loadedPost.description}
            initialValid={loadedPost.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE Post
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePost;
