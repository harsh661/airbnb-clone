"use client"

interface ButtonProps {
  text: string
  onClick?: () => void
  outline?: boolean
  icon?: React.ReactElement
}

const Button: React.FC<ButtonProps> = ({ text, onClick, outline, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full font-bold rounded-md cursor-pointer p-3 flex items-center justify-center ${
        outline
          ? "border border-dark-gray text-black"
          : "bg-accent-pink text-white"
      }`}
    >
      {text}

      {icon && <div className="absolute left-6">{icon}</div>}
    </button>
  )
}

export default Button
