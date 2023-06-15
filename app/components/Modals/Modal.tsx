'use client'

import {MdOutlineClose} from 'react-icons/md'

interface ModalProps {
  isOpen: boolean
  label: string
  body?: React.ReactElement
  footer?: React.ReactElement
  close?: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, label, close, body, footer }) => {

  if (!isOpen) return null
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-dark-gray/50 z-50">
      <div className="bg-white card-shadow h-max w-full phone:w-[568px] rounded-lg animate-entrance">
        <header className="font-bold relative flex items-center justify-center p-5 border-b">
          {label}

            {/* Close icon */}
          <span onClick={close} className="absolute left-3 p-2 rounded-full hover:bg-hover-gray cursor-pointer">
            <MdOutlineClose size={20}/>
          </span>

        </header>
        {body}
        {footer}
      </div>
    </div>
  )
}

export default Modal
