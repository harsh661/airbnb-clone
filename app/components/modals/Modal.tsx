"use client"

import { MdOutlineClose } from "react-icons/md"
import Button from "../Button"

interface ModalProps {
  label: string
  isOpen: boolean
  close?: () => void
  onSubmit?: () => void
  secondaryAction?: () => void
  buttonLabel: string
  secondaryLabel?: string | null
  buttonColored?: boolean
  body?: React.ReactElement
  footer?: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  label,
  close,
  body,
  footer,
  onSubmit,
  buttonLabel,
  secondaryLabel,
  secondaryAction,
  buttonColored,
}) => {

  if (!isOpen) return null
  
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-dark-gray/50 z-50">
      <div className="bg-white card-shadow h-full rounded-lg w-full phone:h-max phone:w-[568px] animate-entrance flex flex-col justify-between">
        <div>
          <header className="font-bold relative flex items-center justify-center p-5 border-b">
            {label}

            {/* Close icon */}
            <span
              onClick={close}
              className="absolute left-3 p-2 rounded-full hover:bg-hover-gray cursor-pointer"
            >
              <MdOutlineClose size={20} />
            </span>
          </header>
          {body}
        </div>
        <div className="p-5 flex items-center justify-between gap-5">
          {secondaryLabel && (
            <Button text={secondaryLabel} onClick={secondaryAction} secondary />
          )}
          <Button
            text={buttonLabel}
            onClick={onSubmit}
            colored={buttonColored}
          />
        </div>
        {footer}
      </div>
    </div>
  )
}

export default Modal
