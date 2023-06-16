interface InputProps {
  type: string
  placeholder: string
  value?: string
}

const Input: React.FC<InputProps> = ({
    type='text',
    placeholder,
    value
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="px-3 py-4 rounded-md border border-light-gray"
    />
  )
}

export default Input
