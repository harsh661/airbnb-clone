import Image from "next/image"
import avatar from "../../public/icons/avatar.png"

interface AvatarProps {
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({
  size
}) => {
  return (
    <Image 
        className="rounded-full"
        height={size ? size : 30}
        width={size ? size : 30}
        src={avatar}
        alt='user'
    />
  )
}

export default Avatar