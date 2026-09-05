const CountryFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      etsi maita
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default CountryFilter;
