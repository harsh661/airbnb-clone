import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    icon: IconType;
    selected: boolean;
}

const Category: React.FC<CategoryProps> = ({
    label, 
    icon: Icon,
    selected
}) => {
  return (
    <div className={`${selected ? 'text-dark-gray': 'text-light-gray'} hover:text-dark-gray cursor-pointer flex flex-col gap-2 items-center pb-3 phone:py-3`}>
        <Icon size={25} />
        <div className="font-medium text-xs phone:text-sm whitespace-nowrap">
          {label}
        </div>
    </div>
  )
}

export default Category