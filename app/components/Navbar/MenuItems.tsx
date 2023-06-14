"use client"

interface MenuItemProps {
  onClick: () => void
  label: string
  border?: boolean
}

const MenuItems: React.FC<MenuItemProps> = ({ onClick, label, border }) => {
  return (
    <div onClick={onClick} className={`px-5 py-3 hover:bg-hover-gray cursor-pointer w-56 ${border && 'border-b'}`}>
      {label}
    </div>
  )
}

export default MenuItems
