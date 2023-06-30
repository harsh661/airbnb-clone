import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useGetCountries = () => {
    const getAll = () => formattedCountries

    const getCountry = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return {
        getAll,
        getCountry,
    }
}

export default useGetCountries