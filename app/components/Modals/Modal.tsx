'use client'

import {MdOutlineClose} from 'react-icons/md'

interface ModalProps {
  label: string
  body?: React.ReactElement
  footer?: React.ReactElement
  close?: () => void
}

const Modal: React.FC<ModalProps> = ({ label, close, body, footer }) => {
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-dark-gray/50 z-50">
      <div className="bg-white h-max w-full phone:w-[568px] rounded-lg">
        <header className="font-bold relative flex items-center justify-center p-5 border-b">
          {label}

            {/* Close icon */}
          <span onClick={close} className="absolute left-5 p-2 rounded-full hover:bg-hover-gray cursor-pointer">
            <MdOutlineClose size={20}/>
          </span>

        </header>
        {body}
      </div>
    </div>
  )
}

export default Modal
