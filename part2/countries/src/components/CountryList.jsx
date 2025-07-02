const CountryList = ({countries,countryValue}) => {
    if (countryValue == "INDIA" || countryValue == "SUDAN" || countryValue == "SOUTH AFRICA") {
        const countryList = countries.filter(country => country.name.toUpperCase() === countryValue)
        return (
            <ul style={{display:"flex",flexDirection:"column",gap:"1.5rem",padding:"0"}}>
                {countryList.map((country,index) =>
                    <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                        <h3>{country.name}</h3>
                        <div>
                            <p>Capital {country.capital}</p>
                            <p>Area {country.area}</p>
                        </div>
                        <h3>Languages</h3>
                        <ul style={{display:"flex",flexDirection:"column",gap:"1rem"}} >
                            {country.languages ? country.languages.map((language,languageIndex)=>
                                <li key={languageIndex}>{language}</li>
                            ): "N/A"}
                        </ul>
                        <img src={country.flag} style={{marginTop:"10px"}}/>
                    </li>
                )}
            </ul>
        )
    }
    else if (countries.length > 1) {
        return(
        <ul style={{display:"flex",flexDirection:"column",gap:"1rem",padding:"0"}}>
            {countries.map((country,index) =>
                <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                    <h3>{country.name}</h3>
                </li>
            )}
        </ul>
    )
    }
    else {
        return(
            <ul style={{display:"flex",flexDirection:"column",gap:"1.5rem",padding:"0"}}>
                {countries.map((country,index) =>
                    <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>
                        <h3>{country.name}</h3>
                        <div>
                            <p>Capital {country.capital}</p>
                            <p>Area {country.area}</p>
                        </div>
                        <h3>Languages</h3>
                        <ul style={{display:"flex",flexDirection:"column",gap:"1rem"}} >
                            {country.languages ? country.languages.map((language,languageIndex)=>
                                <li key={languageIndex}>{language}</li>
                            ): "N/A"}
                        </ul>
                        <img src={country.flag} style={{marginTop:"10px"}}/>
                    </li>
                )}
            </ul>
        )
    }
}

export default CountryList