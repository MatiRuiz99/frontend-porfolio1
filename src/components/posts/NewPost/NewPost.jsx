import React, { useContext } from "react";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import "./NewPost.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Elements/Validator/validators";
import { useForm } from "../../Elements/Hook/form-hook";
import { useHttpClient } from "../../Elements/Hook/http-hook";
import { AuthContext } from "../../Elements/Context/auth-context";
import ErrorModal from "../../Elements/Error/ErrorModal";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../Elements/ImageUpload/ImageUpload";

const NewPost = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: "https://i.imgur.com/Q2IMBBU.jpeg",
        isValid: true,
      },
    },
    false
  );

  const navigate = useNavigate();

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", "https://i.imgur.com/Q2IMBBU.jpeg");
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="post-form" onSubmit={postSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="textarea"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description"
          onInput={inputHandler}
        />
        {/* <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="please provide an image"
        /> */}
        <Button type="submit" disabled={!formState.isValid}>
          {" "}
          POST{" "}
        </Button>
      </form>
    </>
  );
};

export default NewPost;
