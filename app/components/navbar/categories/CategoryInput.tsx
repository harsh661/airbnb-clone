import { IconType } from "react-icons"

interface CategoryInputProps {
    label: string
    icon: IconType
    selected: boolean
    onClick?: () => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick
}) => {
  return (
    <div onClick={onClick} className={`${selected ? 'border-dark-gray': 'border-border-gray'} border-2 hover:border-dark-gray flex flex-col gap-2 p-3 rounded-md cursor-pointer`}>
      <Icon size={30} />
      <h2 className="font-medium">{label}</h2>
    </div>
  )
}

export default CategoryInput
