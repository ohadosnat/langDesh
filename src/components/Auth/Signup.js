import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../customHooks/useForm";
import Button from "../Button";
import Input from "../Input";

export const Signup = () => {
  // Hooks & States
  const history = useHistory();
  const { signup } = useAuth();
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  // Handles Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirm)
      return setError("Passwords do not match 😢");

    try {
      setError("");
      await signup(values.email, values.password, values.name);
      history.push("/main");
    } catch {
      setError("Failed to create an account 😭");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="/assets/imgs/utils/signup.png"
        alt="app's logo"
        className="h-40 mb-5"
      />
      <h1 className="text-2xl">Welcome</h1>
      <hr className="h-[1px] w-1/5 my-2" />
      {error && <p className="text-wrong-base">{error}</p>}
      <form className="w-3/5" onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input type="name" value={values.name} onChangeValue={handleChange} />
          <Input
            type="email"
            value={values.email}
            onChangeValue={handleChange}
          />
          <Input
            type="password"
            value={values.password}
            onChangeValue={handleChange}
          />
          <Input
            type="password"
            inputName="passwordConfirm"
            placeholder="Password Confirmation"
            value={values.passwordConfirm}
            onChangeValue={handleChange}
          />
        </div>
        <Button type="submit" variant="generalOrange">
          Sign up
        </Button>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/signin" className="text-general-dark">
          Sign In
        </Link>
      </p>
    </div>
  );
};
