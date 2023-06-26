import { ChangeEvent, useCallback, useMemo } from "react"

interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: any) => void
}

const Input: React.FC<InputProps> = ({
    type='text',
    placeholder,
    onChange,
    value
}) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="px-3 py-4 rounded-md border border-light-gray w-full"
    />
  )
}

export default Input
