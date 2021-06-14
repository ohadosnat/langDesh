import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../customHooks/useForm";
import Button from "../Button";
import Input from "../Input";

const SignIn = () => {
  // Hooks & States
  const history = useHistory();
  const { signin } = useAuth();
  const [error, setError] = useState("");
  const [values, handleChange] = useForm({ email: "", password: "" });

  // Handles Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await signin(values.email, values.password);
      history.push("/");
    } catch {
      setError("Failed to Sign In");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/logo512.png" alt="app's logo" className="h-40" />
      <h1 className="text-2xl">Welcome</h1>
      <hr className="h-[1px] w-1/5 my-2" />
      {error && <p className="text-wrong-base">{error}</p>}
      <form className="w-3/5" onSubmit={handleSubmit}>
        <div className="mb-6">
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
          <Button type="submit" variant="generalOrange">
            Sign In
          </Button>
        </div>
      </form>
      <p className="mt-3">
        Need an account?{" "}
        <Link to="/signup" className="text-general-dark">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
