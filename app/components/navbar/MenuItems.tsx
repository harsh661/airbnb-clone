"use client"

interface MenuItemProps {
  onClick: () => void
  label: string
  border?: boolean
  bold?: boolean
}

const MenuItems: React.FC<MenuItemProps> = ({ onClick, label, border, bold }) => {
  return (
    <div onClick={onClick} className={`px-5 py-3 hover:bg-hover-gray cursor-pointer w-56 ${bold && 'font-semibold'} ${border && 'border-b'}`}>
      {label}
    </div>
  )
}

export default MenuItems
