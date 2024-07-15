import React from 'react';

const App = () => {
  const course = 'Half Stack application development';
  ;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

  return (
    <div>
      <Header course={course} />
    </div>
  );
};

export default App;
