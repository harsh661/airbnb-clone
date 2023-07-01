'use client'
import Select from 'react-select'

import useGetCountries from "@/app/hooks/useGetCountries"

export type CountrySelectValue = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
} 

interface CountryInputProps {
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue) => void
}

const CountryInput: React.FC<CountryInputProps> = ({
    value,
    onChange
}) => {
  const { getAll } = useGetCountries()

  return (
    <div>
        <Select 
            placeholder="Enter your address"
            isClearable
            options={getAll()} // Add data as array
            value={value}
            onChange={(value)=>onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className='flex items-center gap-3'>
                    <div>{option.flag}</div>
                    <div>{option.label}, {option.region}</div>
                </div>
            )}
            classNames={{
                control: () => 'p-3 border-2',
                option: () => 'text-lg'
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#dddddd'
                }
            })}
        />
    </div>
  )
}

export default CountryInput