const Countries = ({ countries, selectCountry }) => {
  return countries.map((country) => ( // mapataan maat ja näytetään niiden nimet ja "show"-nappi
    <div key={country.name.common}>
      <p>
        {country.name.common}
        <button onClick={() => selectCountry(country)}>nayta</button>
      </p>
    </div>
  ));
};

export default Countries;
