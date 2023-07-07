import Image from "next/image"
import avatar from "../../public/icons/avatar.png"

interface AvatarProps {
  size?: number
  src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({
  size, src
}) => {
  return (
    <Image 
        className="rounded-full"
        height={size ? size : 30}
        width={size ? size : 30}
        src={src ? src : avatar}
        alt='user'
    />
  )
}

export default Avatar