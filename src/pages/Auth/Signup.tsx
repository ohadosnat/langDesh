import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../customHooks/useForm";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { signup } from "../../utils/auth";
import { EmailIcon, PasswordIcon, ProfileIcon } from "../../assets/icons/Icons";

const Signup = () => {
  // Hooks & States
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  // Handles Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirm)
      return setError("Passwords do not match 😢");

    try {
      setError("");
      await signup(values.email, values.password, values.name);
    } catch {
      setError("Failed to create an account 😭");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen lg:w-3/5 2xl:w-2/5 lg:mx-auto">
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
          <Input
            type="name"
            value={values.name}
            onChangeValue={handleChange}
            startIcon={
              <ProfileIcon className="flex-none stroke-current mr-2 w-6 h-6" />
            }
          />
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
          <Input
            type="password"
            inputName="passwordConfirm"
            placeholder="Password Confirmation"
            value={values.passwordConfirm}
            onChangeValue={handleChange}
            startIcon={
              <PasswordIcon className="flex-none stroke-current mr-2 w-6 h-6" />
            }
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

export default Signup;
