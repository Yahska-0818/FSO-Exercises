const CountryList = ({countries}) => {
    return(
        <ul style={{display:"flex",flexDirection:"column",gap:"1rem",padding:"0"}}>
            {countries.map((country,index) =>
                <li key={index} style={{fontSize:"1.5rem", listStyle:"none"}}>{country.name}</li>
            )}
        </ul>
    )
}

export default CountryList