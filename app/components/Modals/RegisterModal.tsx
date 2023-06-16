"use client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Button from "../Button"
import Modal from "./Modal"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from 'react-icons/ai'
import Input from "../Input"

const SignupBody = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold py-5">Welcome to Airbnb</h1>
      <form className="flex flex-col gap-5 border-b pb-10">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button text="Continue" />
      </form>
    </div>
  )
}

const SignupFooter = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5 border-b pb-10">
        <Button text="Continue with Google" outline icon={<FcGoogle size={20}/>}/>
        <Button text="Continue with Github" outline icon={<AiFillGithub size={20}/>}/>
      </div>
    </div>
  )
}

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  return (
    <Modal
      isOpen={registerModal.isOpen}
      label="Log in or Sign up"
      body={<SignupBody />}
      footer={<SignupFooter />}
      close={registerModal.onClose}
    />
  )
}

export default RegisterModal
