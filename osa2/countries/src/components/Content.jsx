import Countries from "./Countries";
import Country from "./Country";

const Content = ({ countries, selectCountry }) => {
    // liikaa tuloksia, listaa ei tartte näyttää
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter {countries.length}</p>;
  }
  // sopiva määrä tuloksia
  if (countries.length <= 10 && countries.length > 1) {
    return <Countries countries={countries} selectCountry={selectCountry} />;
  }
  // vain yksi tulos, näytä maa
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  // ei tuloksia
  return <p>No matches</p>;
};

export default Content;
