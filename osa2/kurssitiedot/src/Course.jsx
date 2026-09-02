import PropTypes from 'prop-types';
import Content from './Content';
import Header from './Header';

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

Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      exercises: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Course;
