"use client";

import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Button from "../Button";
import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Input from "../inputs/Input";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "../Heading";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    main?: string;
  }>({});

  const submitHandler = async () => {
    let newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    const callback = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (callback?.ok) {
      toast.success("Logged in successfully");
      router.refresh();
      loginModal.onClose();
      setEmail("");
      setPassword("");
    } else if (callback?.error) {
      setErrors({ main: callback.error });
    } else {
      setErrors({ main: "Unknown error. Please try again." });
    }
  };

  const loginBody = (
    <div className="p-5">
      <Heading title="Welcome to Airbnb" />
      <form
        className="flex flex-col gap-5 border-b pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) submitHandler();
        }}
        autoComplete="off"
      >
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

  const loginFooter = (
    <div className="p-5">
      <div className="flex flex-col gap-5 border-b pb-10">
        <Button
          text="Continue with Google"
          outline
          icon={<FcGoogle size={20} />}
          onClick={() => signIn("google")}
        />
        <Button
          text="Continue with Github"
          outline
          icon={<AiFillGithub size={20} />}
          onClick={() => signIn("github")}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      label="Log in"
      body={loginBody}
      buttonLabel="Continue"
      onSubmit={submitHandler}
      footer={loginFooter}
      close={loginModal.onClose}
      buttonLoading={loading}
    />
  );
};

export default LoginModal;
