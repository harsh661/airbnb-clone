import { ChangeEvent } from "react"

interface InputProps {
  type?: string
  placeholder: string
  price?: boolean
  value: string | number
  onChange: (e: any) => void
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  onChange,
  value,
  price,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="relative flex items-center">
      {price && (
        <span className="absolute left-3 font-semibold text-xl">₹</span>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${price ? 'px-8 font-semibold text-xl': 'px-3'} py-4 rounded-md border border-light-gray w-full`}
      />
    </div>
  )
}

export default Input
