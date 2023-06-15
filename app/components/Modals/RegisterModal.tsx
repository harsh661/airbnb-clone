"use client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Button from "../Button"
import Modal from "./Modal"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub, AiFillFacebook} from 'react-icons/ai'

const SignupBody = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold py-5">Welcome to Airbnb</h1>
      <form className="flex flex-col gap-5 border-b pb-10">
        <input
          type="text"
          placeholder="Email"
          className="px-3 py-4 rounded-md border border-light-gray"
        />
        <Button text="Continue" />
      </form>
    </div>
  )
}

const SignupFooter = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5 border-b pb-10">
        <Button text="Continue with Facebook" outline icon={<AiFillFacebook fill="#1877f2" size={20}/>}/>
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
