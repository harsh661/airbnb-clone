"use client"

import { useCallback } from "react"
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci"

interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({ label, value, onChange }) => {
  const add = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])

  const reduce = useCallback(() => {
    if (value <= 1) {
        return
    }
    onChange(value - 1)
  }, [value, onChange])

  return (
    <div className="flex items-center justify-between py-5">
      <span className="text-lg">{label}</span>
      <div className="flex items-center gap-3 text-light-gray">
        <span onClick={reduce} className="text-zinc-400 hover:text-dark-gray">
          <CiCircleMinus size={35} />
        </span>

        <span className="text-dark-gray text-lg">{value}</span>

        <span onClick={add} className="text-zinc-400 hover:text-dark-gray">
          <CiCirclePlus size={35} />
        </span>
      </div>
    </div>
  )
}

export default Counter
