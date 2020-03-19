import React from 'react';
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const CustomLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: 'whitesmoke'
  },
  barColorPrimary: {
    backgroundColor: 'grey'
  }
})(LinearProgress);

const useStyles = makeStyles({
  horizontalLoader: {
    position: 'absolute',
    bottom: -4,
    width: '100%'
  }
});

const HorizontalLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.horizontalLoader}>
      <CustomLinearProgress />
    </div>
  );
};

export default HorizontalLoader;
