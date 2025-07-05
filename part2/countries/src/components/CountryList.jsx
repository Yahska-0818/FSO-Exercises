import axios from "axios"
const api_key = import.meta.env.VITE_SOME_KEY

const CountryList = ({countries,countryValue,allCountries,changeCountries}) => {

    const toggleView = (id) => {
        let currentCountries = [...allCountries]
        currentCountries[id].show = true
        changeCountries(currentCountries)
    }

    const getCityWeather = async (cityName,cityWeather) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
        )
        delhiWeather.temp = response.data.main.temp
        delhiWeather.wind = response.data.wind.speed
        delhiWeather.icon = response.data.weather[0].icon
    }


    if (countryValue == "INDIA" || countryValue == "SUDAN" || countryValue == "SOUTH AFRICA") {
        const countryList = countries.filter(country => country.name.toUpperCase() === countryValue)
        let cityWeather = {}
        return (
            <ul style={{display:"flex",flexDirection:"column",gap:"1.5rem",padding:"0"}}>
                {countryList.map((country,index) =>
                    <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                        <h3>{country.name}</h3>
                        <div>
                            <p>Capital: {country.capital}</p>
                            <p>Area: {country.area}</p>
                        </div>
                        <h3>Languages</h3>
                        <ul style={{display:"flex",flexDirection:"column",gap:"1rem"}} >
                            {country.languages ? country.languages.map((language,languageIndex)=>
                                <li key={languageIndex}>{language}</li>
                            ): "N/A"}
                        </ul>
                        <img src={country.flag} style={{marginTop:"10px",border:"solid 2px black"}}/>
                        <h3>Weather in {country.capital}</h3>
                    </li>
                )}
            </ul>
        )
    }
    else if (countries.length > 1) {
        return(
        <ul style={{display:"flex",flexDirection:"column",gap:"1rem",padding:"0"}}>
            {countries.map((country,index) => country.show?
                <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                        <h3>{country.name}</h3>
                        <div>
                            <p>Capital: {country.capital}</p>
                            <p>Area: {country.area}</p>
                        </div>
                        <h3>Languages</h3>
                        <ul style={{display:"flex",flexDirection:"column",gap:"1rem"}} >
                            {country.languages ? country.languages.map((language,languageIndex)=>
                                <li key={languageIndex}>{language}</li>
                            ): "N/A"}
                        </ul>
                        <img src={country.flag} style={{marginTop:"10px",border:"solid 2px black"}}/>
                </li>
                :
                <li key={index} style={{fontSize:"1.5rem", listStyle:"none",display:"flex",gap:"1rem",alignItems:"center"}}>
                    <h3>{country.name}</h3>
                    <button type="button" onClick={()=>toggleView(country.id)} style={{height:"3rem",width:"6rem",fontSize:"1.3rem"}}>Show</button>
                </li>
            )}
        </ul>
    )
    }
    else if (countries.length === 1){
        if (countries[0].name == "Too many matches, specify another filter") {
            return (
                <h1>Too many matches, specify another filter</h1>
            )
        }
        return(
            <ul style={{display:"flex",flexDirection:"column",gap:"1.5rem",padding:"0"}}>
                {countries.map((country,index) =>
                    <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                        <h3>{country.name}</h3>
                        <div>
                            <p>Capital: {country.capital}</p>
                            <p>Area: {country.area}</p>
                        </div>
                        <h3>Languages</h3>
                        <ul style={{display:"flex",flexDirection:"column",gap:"1rem"}} >
                            {country.languages ? country.languages.map((language,languageIndex)=>
                                <li key={languageIndex}>{language}</li>
                            ): "N/A"}
                        </ul>
                        <img src={country.flag} style={{marginTop:"10px",border:"solid 2px black"}}/>
                    </li>
                )}
            </ul>
        )
    }
}

export default CountryList