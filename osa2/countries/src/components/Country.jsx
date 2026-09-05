import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>paakaupunki {country.capital[0]}</p>
      <p>pinta-ala {country.area}</p>
      <h3>kielet:</h3>
      <ul>
        {/* kielet tulee objektina esim { fin: "Finnish" }, joten kaydaan avaimet lapi */}
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <Weather
        name={country.capital[0]}
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
      />
    </div>
  );
};

export default Country;