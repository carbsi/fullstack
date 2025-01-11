// App.jsx

// Header-komponentti renderöi kurssin nimen
const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

// Part-komponentti renderöi yhden osan nimen ja tehtävien määrän
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// Content-komponentti renderöi listan Part-komponentteja
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        // Jokaiselle Part-komponentille annetaan uniikki avain ja sille välitetään nimi ja tehtävien määrä propseina
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

// Total-komponentti laskee ja renderöi tehtävien kokonaismäärän
const Total = ({ parts }) => {
  // Lasketaan osien taulukosta tehtävien summa reduce-metodilla
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

// App-komponentti on pääkomponentti, joka sisältää kurssidatan ja renderöi Header-, Content- ja Total-komponentit
const App = () => {
  // Kurssin nimi
  const course = 'Half Stack application development';

  // Taulukko osista, joista jokaisella on nimi ja tehtävien määrä
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  // Renderöidään Header-, Content- ja Total-komponentit, ja välitetään tarvittavat tiedot propseina
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;