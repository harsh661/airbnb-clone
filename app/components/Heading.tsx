interface HeadingProps {
    title: string
    subtitle?: string
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle
}) => {
  return (
    <>
    <h1 className="text-2xl font-bold py-5">{title}</h1>
    </>
  )
}

export default Heading