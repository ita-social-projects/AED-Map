import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { photos } from '../../../../../mocks';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  }
}));

const ModalPhotoContent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md">
      <GridList
        cellHeight={180}
        className={classes.gridList}
      >
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ height: 'auto' }}
        >
          <ListSubheader component="div">
            Усі фотографії
          </ListSubheader>
        </GridListTile>
        {photos.map(photo => (
          <GridListTile key={photo.title}>
            <img src={photo.img} alt={photo.title} />
            <GridListTileBar
              title={photo.title}
              subtitle={(
                <span>
                  by:
                  {photo.author}
                </span>
              )}
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
};

export default ModalPhotoContent;
