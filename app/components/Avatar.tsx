import Image from "next/image"
import avatar from "../../public/icons/avatar.png"

const Avatar = () => {
  return (
    <Image 
        className="rounded-full"
        height={30}
        width={30}
        src={avatar}
        alt='user'
    />
  )
}

export default Avatar