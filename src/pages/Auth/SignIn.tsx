import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../customHooks/useForm";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { signin } from "../../utils/auth";
import { EmailIcon, PasswordIcon } from "../../assets/icons/Icons";

const SignIn = () => {
  // Hooks & States
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, handleChange] = useForm({ email: "", password: "" });

  // Handles Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      await signin(values.email, values.password);
      navigate("/");
    } catch {
      setError("Failed to Sign In");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen lg:w-3/5 2xl:w-2/5 lg:mx-auto">
      <img
        src="/assets/imgs/utils/signin.png"
        alt="doodle of a woman reading a book"
        className="h-40 mb-5"
      />
      <h1 className="text-2xl">Welcome</h1>
      <hr className="h-[1px] w-1/5 my-2" />
      {error && <p className="text-wrong-base">{error}</p>}
      <form className="w-3/5" onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            type="email"
            value={values.email}
            onChangeValue={handleChange}
            startIcon={
              <EmailIcon className="flex-none stroke-current mr-2 w-6 h-6" />
            }
          />
          <Input
            type="password"
            value={values.password}
            onChangeValue={handleChange}
            startIcon={
              <PasswordIcon className="flex-none stroke-current mr-2 w-6 h-6" />
            }
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
