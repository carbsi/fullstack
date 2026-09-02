import PropTypes from 'prop-types';

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

Part.propTypes = {
  part: PropTypes.shape({
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired,
  }).isRequired,
};

export default Part;
