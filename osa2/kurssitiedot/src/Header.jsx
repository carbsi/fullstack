import PropTypes from 'prop-types';

const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

Header.propTypes = {
  courseName: PropTypes.string.isRequired,
};

export default Header;
