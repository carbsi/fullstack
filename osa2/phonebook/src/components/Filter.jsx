const Filter = ({ filterStr, handleChangeFilter }) => {
  return (  // filter-komponentti, joka sisältää input-kentän, johon käyttäjä voi kirjoittaa suodatettavan nimen
    <div>
      filter shown with
      <input value={filterStr} onChange={handleChangeFilter} />
    </div>
  );
};

export default Filter;
