const PriceSwitch = () => {
  return (
    <div className="rounded-xl p-3 mx-auto phone:py-5 border border-border-gray my-5 flex items-center justify-between w-full small:w-[592px]">
      <span className="leading-5 flex flex-col phone:flex-row phone:gap-3">
        <b>Display total price</b>
        <span className="w-[2px] h-5 bg-border-gray hidden phone:flex"/>
        <h3 className="text-light-gray">Includes all fees, before taxes</h3>
      </span>
    </div>
  )
}

export default PriceSwitch