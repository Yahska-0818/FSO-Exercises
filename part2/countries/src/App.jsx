import { useState,useEffect } from 'react'
import CountryList from './components/CountryList'

const App = () => {
  const [country,setCountry] = useState("")
  const [countryValue,setCountryValue] = useState('')

  const allCountries = [{name:"Kosovo"},{name:"Denmark"},{name:"Czechia"},{name:"Turkiye"},{name:"New Zealand"},{name:"Bermuda"},{name:"Brazil"},{name:"Mongolia"},{name:"Argentina"},{name:"Sweden"},{name:"Papua New Guinea"},{name:"Maldives"},{name:"Austria"},{name:"Australia"},{name:"Switzerland"},{name:"Turkmenistan"},{name:"Japan"}]

  const handleChange = (event) => {
    setCountryValue(event.target.value)
  }

  let showCountries = []

  let tooManyCountries = ""

  if (countryValue.length > 0) {
    showCountries = allCountries.filter(country => country.name.includes(countryValue))
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
      <CountryList countries={showCountries}/>
      <h1>{country}</h1>
    </div>
  )
}

export default App
