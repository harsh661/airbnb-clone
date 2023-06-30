interface HeadingProps {
    title: string
    subtitle?: string
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle
}) => {
  return (
    <div className="py-5 flex flex-col gap-2">
    <h1 className="text-2xl font-bold ">{title}</h1>
    {subtitle && (
      <h3 className="text-light-gray">
        {subtitle}
      </h3>
    )}
    </div>
  )
}

export default Heading