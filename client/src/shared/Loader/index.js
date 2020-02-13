import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  '@keyframes rotating': {
    '100%': { transform: 'rotate(360deg)' }
  },

  loadCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0)',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#000',
    borderBottomColor: '#000',
    animation: '$rotating 0.7s ease infinite'
  }
}));

const Loader = () => {
  const classes = useStyles();

  return <div className={classes.loadCircle} />;
};

export default Loader;
