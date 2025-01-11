import React from 'react';

// Header-komponentti näyttää kurssin nimen
const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

// Part-komponentti näyttää yksittäisen osan tiedot
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Content-komponentti näyttää kaikki kurssin osat
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

// Course-komponentti näyttää koko kurssin
const Course = ({ course }) => {
  // Lasketaan tehtävien kokonaismäärä
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total exercises: {totalExercises}</strong></p>
    </div>
  );
};

export default Course;