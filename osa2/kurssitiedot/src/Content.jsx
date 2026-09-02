import PropTypes from 'prop-types';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

Content.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    exercises: PropTypes.number.isRequired,
  })).isRequired,
};

export default Content;
