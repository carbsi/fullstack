import React from 'react';

// App-komponentti sisältää koko sovelluksen
const App = () => {
// kurssille nimi
  const course = 'Half Stack application development';
  // kurssin osat ja harkkojen määrät
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  // Part-komponentti esittää yksittäisen osan
  const Part = ({ name, exercises }) => {
    console.log('Part props:', { name, exercises });
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };

  // Content-komponentti esittää kurssin osat // kolmen alkion oletus
  const Content = ({ parts }) => {
    console.log('Content props:', { parts });
    return (
      <div> 
          <Part name={parts[0].name} exercises={parts[0].exercises} /> 
          <Part name={parts[1].name} exercises={parts[1].exercises} />
          <Part name={parts[2].name} exercises={parts[2].exercises} />
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
