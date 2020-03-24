import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles({
  pointCardBlockButton: {
    minWidth: 'auto',
    marginLeft: 'auto'
  }
});

const BlockBtn = ({ handleOpen, blocked }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color={blocked ? 'secondary' : 'primary'} className={classes.pointCardBlockButton} size="small" onClick={handleOpen}>
      <BlockIcon fontSize="small" />
    </Button>
  );
};

BlockBtn.defaultProps = {
  handleOpen: () => null
};
BlockBtn.propTypes = {
  handleOpen: PropTypes.func,
  blocked: PropTypes.bool.isRequired
};

export default BlockBtn;
