"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "../Button";
import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Input from "../inputs/Input";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import { signIn } from "next-auth/react";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    main?: string;
  }>({});

  const submitHandler = async () => {
    let newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      await axios.post("/api/signup", { name, email, password });
      registerModal.onClose();
      setName("");
      setEmail("");
      setPassword("");
      toast.success("Account created");
    } catch (err: any) {
      if (
        err?.response &&
        err.response.data &&
        typeof err.response.data === "string"
      ) {
        setErrors({ main: err.response.data });
      } else {
        setErrors({ main: "Something went wrong. Please try again." });
      }
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const signupBody = (
    <div className="p-5">
      <Heading title="Welcome to Airbnb" />
      <form
        className="flex flex-col gap-5 border-b pb-10"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) submitHandler();
        }}
      >
        <div>
          <Input
            onChange={setName}
            value={name}
            type="text"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Input
            onChange={setEmail}
            value={email}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Input
            onChange={setPassword}
            value={password}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>
        {errors.main && (
          <p className="text-xs text-red-500 text-center">{errors.main}</p>
        )}
      </form>
    </div>
  );

  const signupFooter = (
    <div className="p-5">
      <div className="flex flex-col gap-5 border-b pb-10">
        <Button
          onClick={() => signIn("google")}
          text="Continue with Google"
          outline
          icon={<FcGoogle size={20} />}
        />
        <Button
          onClick={() => signIn("github")}
          text="Continue with Github"
          outline
          icon={<AiFillGithub size={20} />}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      label="Sign up"
      body={signupBody}
      buttonLabel="Continue"
      onSubmit={submitHandler}
      footer={signupFooter}
      close={registerModal.onClose}
      buttonLoading={loading}
    />
  );
};

export default RegisterModal;
