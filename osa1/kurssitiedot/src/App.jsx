import React from 'react';

// App-komponentti sisältää koko sovelluksen
const App = () => {

  const course = 'Half Stack application development';
  
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  // Part-komponentti esittää yksittäisen osan
  const Part = ({ name, exercises }) => {
    console.log('Part props:', { name, exercises });
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };

  // Content-komponentti esittää kurssin osat
  const Content = ({ parts }) => {
    console.log('Content props:', { parts });
    return (
      <div>
        {parts.map(part => (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };

  // Header-komponentti esittää kurssin nimen
  const Header = ({ course }) => {
    console.log('Header props:', { course });
    return <h1>{course}</h1>;
  };

  // Total-komponentti laskee ja esittää harjoitusten kokonaismäärän
  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log('Total props:', { parts });
    return <p>Number of exercises {totalExercises}</p>;
  };

  // Osat muunnetaan tauluksi, jotta niitä voidaan käsitellä Content ja Total komponenteissa
  const parts = [part1, part2, part3];

  // Koko sovelluksen rakenne palautuu
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
