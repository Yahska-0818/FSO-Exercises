import { useState,useEffect } from 'react'
import CountryList from './components/CountryList'
import axios from "axios"

const App = () => {
  const [country,setCountry] = useState("")
  const [countryValue,setCountryValue] = useState('')
  const [allCountries,setAllCountries] = useState([])
  
  useEffect(()=>{
    axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response=>{
          const simplifiedCountries = response.data.map(country => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "N/A",
            area: country.area,
            languages: country.languages ? Object.values(country.languages) : "N/A",
            flag: country.flags ? Object.values(country.flags)[0] : "N/A"
          }))
          setAllCountries(simplifiedCountries)
        })
  },[])

  const handleChange = (event) => {
    setCountryValue(event.target.value)
  }

  let showCountries = []

  if (countryValue.length > 0) {
    showCountries = allCountries.filter(country => country.name.toUpperCase().includes(countryValue.toUpperCase()))
    if (showCountries.length > 10) {
      showCountries = [{name:"Too many matches, specify another filter"}]
    }
  }

  useEffect(() => {
    if (showCountries.length === 1 && showCountries[0].name !== "Too many matches, specify another filter") {
      setCountry(showCountries[0].name)
    } else {
      setCountry("")
    }
  }, [showCountries])

  return(
    <div style={{display:'flex',flexDirection:'column',gap:"1rem",margin:"1rem",fontFamily:"Calibri"}}>
      <form style={{display:'flex',gap:"1rem",alignItems:"center",fontSize:"1.5rem"}}>
        Country: <input type="text" value={countryValue} onChange={handleChange} style={{fontSize:"1.3rem",fontFamily:"Calibri"}}/>
      </form>
      <CountryList countries={showCountries} countryValue={countryValue.toUpperCase()}/>
    </div>
  )
}

export default App
