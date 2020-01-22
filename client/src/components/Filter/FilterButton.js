import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

const FilterButton = ({
  isOpen,
  setIsOpen,
  isFilter,
  setTitle,
  setAddress,
  setLanguage,
  filter,
}) => {
  const checkInputIsSet = () => {
    if (!filter.title) {
      setTitle('');
    }

    if (!filter.address) {
      setAddress('');
    }

    if (!filter.language) {
      setLanguage('');
    }
  };

  const toggleFilter = () => {
    setIsOpen((prevState) => !prevState);

    if (!isOpen) {
      checkInputIsSet();
    }
  };

  return (
    <IconButton
      color="primary"
      aria-label="filter"
      onClick={toggleFilter}
    >
      {isFilter ? (
        <Badge color="secondary" variant="dot">
          <Tooltip title="Filter">
            <FilterListIcon />
          </Tooltip>
        </Badge>
      ) : (
        <Tooltip
          title={
            isOpen ? 'Close the filter' : 'Open the filter'
          }>
          <FilterListIcon />
        </Tooltip>
      )}
    </IconButton>
  );
};

FilterButton.propTypes = {
  isFilter: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

export default connect(mapStateToProps, null)(FilterButton);
