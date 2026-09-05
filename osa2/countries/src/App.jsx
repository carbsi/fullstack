import { useState, useEffect } from "react";

// kompot
import getAllCountries from "./services/countries";
import CountryFilter from "./components/CountryFilter";
import Content from "./components/Content";

const App = () => {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // haetaan kaikki maat kerran kun App ensimmäisen kerran renderöityy
  useEffect(() => {
    getAllCountries().then((allCountries) => {
      setAllCountries(allCountries);
    });
  }, []);



  // suodatetaan maalista aina kun hakukenttää muutetaan
  const handleFilterChange = (event) => {
    const hakusana = event.target.value;

    // tyhja hakukentta = nayta kaikki, muuten suodata nimen mukaan
    const countries =
      hakusana.trim().length === 0
        ? allCountries
        : allCountries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(hakusana.trim().toLowerCase())
          );

          // asetetaan suodatettu lista ja hakusana tilaan
    setFilter(hakusana);
    setFilteredCountries(countries);
  };

  // kun kayttaja klikkaa "show" yhdelle maalle listassa
  const selectCountry = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Content
        countries={filteredCountries}
        filter={filter}
        selectCountry={selectCountry}
      />
    </div>
  );
};

export default App;