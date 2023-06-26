"use client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Button from "../Button"
import Modal from "./Modal"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import Input from "../Input"
import { useState } from "react"
import axios from 'axios'
import { toast } from "react-hot-toast"
import Heading from "../Heading"

const RegisterModal = () => {
  const registerModal = useRegisterModal()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = () => {
    axios.post('/api/signup', {name, email, password})
      .then(()=> {
        registerModal.onClose()
      })
      .catch(err => {
        toast.error('Something went wrong')
      })
  }


  const signupBody = (
      <div className="p-5">
        <Heading title="Welcome to Airbnb" />
        <form className="flex flex-col gap-5 border-b pb-10">
          <Input onChange={setName} value={name} type="text" placeholder="Name" />
          <Input onChange={setEmail} value={email} type="email" placeholder="Email" />
          <Input onChange={setPassword} value={password} type="password" placeholder="Password" />
        </form>
      </div>
    )

  const signupFooter = (
      <div className="p-5">
        <div className="flex flex-col gap-5 border-b pb-10">
          <Button
            text="Continue with Google"
            outline
            icon={<FcGoogle size={20} />}
          />
          <Button
            text="Continue with Github"
            outline
            icon={<AiFillGithub size={20} />}
          />
        </div>
      </div>
    )
  
  return (
    <Modal
      isOpen={registerModal.isOpen}
      label="Sign up"
      body={signupBody}
      buttonLabel="Continue"
      onSubmit={submitHandler}
      footer={signupFooter}
      close={registerModal.onClose}
    />
  )
}

export default RegisterModal
