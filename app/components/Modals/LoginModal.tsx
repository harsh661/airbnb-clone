"use client"

import { signIn } from 'next-auth/react'
import useLoginModal from "@/app/hooks/useLoginModal"
import Button from "../Button"
import Modal from "./Modal"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import Input from "../Input"
import { useState } from "react"
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e: any) => {
    e.preventDefault()
    
    signIn('credentials', {
      email, password,
      redirect: false
    })
    .then(callback => {
      if (callback?.ok) {
        toast.success('Logged in successfully')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }


  const loginBody = (
      <div className="p-5">
        <h1 className="text-2xl font-bold py-5">Welcome to Airbnb</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 border-b pb-10">
          <Input onChange={setEmail} value={email} type="email" placeholder="Email" />
          <Input onChange={setPassword} value={password} type="password" placeholder="Password" />
          <Button text="Continue" />
        </form>
      </div>
    )

  const loginFooter = (
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
      isOpen={loginModal.isOpen}
      label="Log in"
      body={loginBody}
      footer={loginFooter}
      close={loginModal.onClose}
    />
  )
}

export default LoginModal
