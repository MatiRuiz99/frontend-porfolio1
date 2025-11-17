import React, { useEffect, useReducer } from "react";
import { validate } from "../Validator/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (p) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: p.initialValue || "",
    isTouched: false,
    isValid: p.initialValid || "",
  });

  const { id, onInput } = p;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: p.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    p.element === "input" ? (
      <input
        id={p.id}
        type={p.type}
        placeholder={p.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={p.id}
        rows={p.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={p.id}>{p.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{p.errorText}</p>}
    </div>
  );
};

export default Input;
