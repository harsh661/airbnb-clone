"use client"

interface ButtonProps {
  text: string
  onClick?: () => void
  outline?: boolean
  secondary?: boolean
  icon?: React.ReactElement
  colored?: boolean
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  outline,
  icon,
  colored,
  secondary,
}) => {
  let style = 'bg-accent-pink text-white'

    if (colored) {
      style = "bg-black text-white"
    }
    if (secondary) {
      style = "bg-white text-black underline"
    }
    if (outline) {
      style = "border border-dark-gray bg-white text-black"
    }


  return (    
    <button
      onClick={onClick}
      className={`${style} relative w-full font-bold rounded-md cursor-pointer p-3 flex items-center justify-center`}
    >
      {text}

      {icon && <div className="absolute left-6">{icon}</div>}
    </button>
  )
}

export default Button
